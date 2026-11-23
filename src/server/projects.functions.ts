import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { and, asc, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "#/db";
import {
	conversations,
	messages,
	projects,
	systemModels,
	workspaceMembers,
	workspaces,
} from "#/db/schema";
import { CreateProjectSchema } from "#/features/projects/project-input";
import { createInitialSystemModel } from "#/features/system-model/schema";
import { getAuth } from "#/lib/auth";

async function requireUser() {
	const session = await getAuth().api.getSession({
		headers: getRequestHeaders(),
	});

	if (!session) {
		throw new Error("You must be signed in to access projects.");
	}

	return session.user;
}

export const listProjectsFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const currentUser = await requireUser();
		const db = getDb();

		const records = await db
			.select({
				id: projects.id,
				name: projects.name,
				description: projects.description,
				status: projects.status,
				updatedAt: projects.updatedAt,
			})
			.from(projects)
			.innerJoin(
				workspaceMembers,
				and(
					eq(workspaceMembers.workspaceId, projects.workspaceId),
					eq(workspaceMembers.userId, currentUser.id),
				),
			)
			.orderBy(desc(projects.updatedAt))
			.limit(50);

		return records.map((project) => ({
			...project,
			updatedAt: project.updatedAt.toISOString(),
		}));
	},
);

export const createProjectFn = createServerFn({ method: "POST" })
	.validator(CreateProjectSchema)
	.handler(async ({ data }) => {
		const currentUser = await requireUser();
		const db = getDb();

		return db.transaction(async (tx) => {
			const workspaceSlug = `personal-${currentUser.id
				.toLowerCase()
				.replace(/[^a-z0-9-]/g, "")
				.slice(-48)}`;

			const [createdWorkspace] = await tx
				.insert(workspaces)
				.values({
					name: `${currentUser.name || "My"} workspace`,
					slug: workspaceSlug,
					ownerId: currentUser.id,
				})
				.onConflictDoNothing({ target: workspaces.ownerId })
				.returning({ id: workspaces.id });

			const workspace =
				createdWorkspace ??
				(
					await tx
						.select({ id: workspaces.id })
						.from(workspaces)
						.where(eq(workspaces.ownerId, currentUser.id))
						.limit(1)
				)[0];

			if (!workspace) {
				throw new Error("Unable to create or locate your workspace.");
			}

			await tx
				.insert(workspaceMembers)
				.values({
					workspaceId: workspace.id,
					userId: currentUser.id,
					role: "owner",
				})
				.onConflictDoNothing({
					target: [workspaceMembers.workspaceId, workspaceMembers.userId],
				});

			const [project] = await tx
				.insert(projects)
				.values({
					workspaceId: workspace.id,
					name: data.name,
					description: data.description,
				})
				.returning({
					id: projects.id,
					name: projects.name,
					description: projects.description,
					status: projects.status,
					updatedAt: projects.updatedAt,
				});

			if (!project) {
				throw new Error("Unable to create the project.");
			}

			await tx.insert(systemModels).values({
				projectId: project.id,
				schemaVersion: 1,
				revision: 0,
				modelData: createInitialSystemModel({
					name: data.name,
					description: data.description,
				}),
				updatedBy: currentUser.id,
			});

			const [conversation] = await tx
				.insert(conversations)
				.values({
					projectId: project.id,
					title: data.initialIdea ? "First conversation" : "Getting started",
					createdBy: currentUser.id,
				})
				.returning({ id: conversations.id });

			if (data.initialIdea && conversation) {
				await tx.insert(messages).values({
					conversationId: conversation.id,
					role: "user",
					content: data.initialIdea,
				});
			}

			return {
				...project,
				updatedAt: project.updatedAt.toISOString(),
			};
		});
	});

export const getProjectFn = createServerFn({ method: "GET" })
	.validator(z.uuid())
	.handler(async ({ data: projectId }) => {
		const currentUser = await requireUser();
		const db = getDb();
		const [project] = await db
			.select({
				id: projects.id,
				name: projects.name,
				description: projects.description,
				status: projects.status,
				updatedAt: projects.updatedAt,
			})
			.from(projects)
			.innerJoin(
				workspaceMembers,
				and(
					eq(workspaceMembers.workspaceId, projects.workspaceId),
					eq(workspaceMembers.userId, currentUser.id),
				),
			)
			.where(eq(projects.id, projectId))
			.limit(1);

		if (!project) {
			throw new Error("Project not found.");
		}

		const [firstMessage] = await db
			.select({ content: messages.content })
			.from(messages)
			.innerJoin(conversations, eq(conversations.id, messages.conversationId))
			.where(
				and(eq(conversations.projectId, project.id), eq(messages.role, "user")),
			)
			.orderBy(asc(messages.createdAt))
			.limit(1);

		return {
			...project,
			updatedAt: project.updatedAt.toISOString(),
			initialIdea: firstMessage?.content ?? "",
		};
	});
