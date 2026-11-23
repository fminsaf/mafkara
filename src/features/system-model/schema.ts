import { z } from "zod";

const ElementStatusSchema = z.enum([
	"proposed",
	"confirmed",
	"deprecated",
	"blocked",
]);

const ElementDomainSchema = z.enum([
	"requirements",
	"modules",
	"ui-ux",
	"frontend",
	"backend",
	"database",
	"apis",
	"workflows",
	"architecture",
	"security",
	"documentation",
]);

export const SystemElementSchema = z.object({
	id: z.uuid(),
	type: z.string().min(1),
	domain: ElementDomainSchema,
	name: z.string().min(1).max(160),
	description: z.string().max(4000).default(""),
	status: ElementStatusSchema.default("proposed"),
	createdAt: z.iso.datetime(),
	updatedAt: z.iso.datetime(),
	relatedElementIds: z.array(z.uuid()).default([]),
	dependencies: z.array(z.uuid()).default([]),
});

const RequirementSchema = SystemElementSchema.extend({
	type: z.literal("requirement"),
	domain: z.literal("requirements"),
	category: z.enum([
		"functional",
		"non-functional",
		"user",
		"business",
		"technical",
	]),
	acceptanceCriteria: z.array(z.string()).default([]),
});

const ModuleSchema = SystemElementSchema.extend({
	type: z.literal("module"),
	domain: z.literal("modules"),
	responsibilities: z.array(z.string()).default([]),
});

const FieldSchema = z.object({
	id: z.uuid(),
	name: z.string().min(1).max(120),
	dataType: z.string().min(1).max(80),
	description: z.string().max(1000).default(""),
	required: z.boolean().default(false),
	primaryKey: z.boolean().default(false),
	unique: z.boolean().default(false),
	defaultValue: z.string().optional(),
	validationRules: z.array(z.string()).default([]),
});

const DatabaseEntitySchema = SystemElementSchema.extend({
	type: z.literal("database_entity"),
	domain: z.literal("database"),
	fields: z.array(FieldSchema).default([]),
	indexes: z.array(z.string()).default([]),
});

const ScreenSchema = SystemElementSchema.extend({
	type: z.literal("screen"),
	domain: z.literal("ui-ux"),
	route: z.string().optional(),
	componentIds: z.array(z.uuid()).default([]),
});

const ApiEndpointSchema = SystemElementSchema.extend({
	type: z.literal("api_endpoint"),
	domain: z.literal("apis"),
	method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
	path: z.string().min(1),
	authenticationRequired: z.boolean().default(true),
	requestSchema: z.string().optional(),
	responseSchema: z.string().optional(),
});

const WorkflowSchema = SystemElementSchema.extend({
	type: z.literal("workflow"),
	domain: z.literal("workflows"),
	actors: z.array(z.string()).default([]),
	triggers: z.array(z.string()).default([]),
	actions: z.array(z.string()).default([]),
	outcomes: z.array(z.string()).default([]),
	failureStates: z.array(z.string()).default([]),
});

const ArchitectureComponentSchema = SystemElementSchema.extend({
	type: z.literal("architecture_component"),
	domain: z.literal("architecture"),
	componentKind: z.enum([
		"client",
		"service",
		"database",
		"integration",
		"worker",
	]),
});

export const SystemModelSchema = z
	.object({
		schemaVersion: z.literal(1),
		project: z.object({
			name: z.string().min(1).max(160),
			description: z.string().max(1000),
			goals: z.array(z.string()),
			targetAudience: z.array(z.string()),
			objectives: z.array(z.string()),
			scope: z.array(z.string()),
			constraints: z.array(z.string()),
			status: z.enum(["draft", "in-progress", "ready"]),
		}),
		requirements: z.array(RequirementSchema),
		assumptions: z.array(SystemElementSchema),
		decisions: z.array(SystemElementSchema),
		unresolvedQuestions: z.array(SystemElementSchema),
		risks: z.array(SystemElementSchema),
		constraints: z.array(SystemElementSchema),
		modules: z.array(ModuleSchema),
		screens: z.array(ScreenSchema),
		frontend: z.object({
			applicationStructure: z.array(z.string()),
			components: z.array(SystemElementSchema),
			routes: z.array(z.string()),
			stateResponsibilities: z.array(z.string()),
			integrations: z.array(z.string()),
		}),
		backend: z.object({
			services: z.array(SystemElementSchema),
			operations: z.array(SystemElementSchema),
			backgroundJobs: z.array(SystemElementSchema),
			events: z.array(SystemElementSchema),
		}),
		database: z.object({
			entities: z.array(DatabaseEntitySchema),
			relationships: z.array(SystemElementSchema),
			enums: z.array(SystemElementSchema),
		}),
		apis: z.array(ApiEndpointSchema),
		workflows: z.array(WorkflowSchema),
		architecture: z.object({
			components: z.array(ArchitectureComponentSchema),
			relationships: z.array(SystemElementSchema),
		}),
		security: z.object({
			authentication: z.array(z.string()),
			authorization: z.array(z.string()),
			roles: z.array(SystemElementSchema),
			permissions: z.array(SystemElementSchema),
			requirements: z.array(SystemElementSchema),
			threatConsiderations: z.array(z.string()),
		}),
		documentation: z.array(SystemElementSchema),
	})
	.strict();

export type SystemModel = z.infer<typeof SystemModelSchema>;

export function createInitialSystemModel(input: {
	name: string;
	description: string;
}): SystemModel {
	return SystemModelSchema.parse({
		schemaVersion: 1,
		project: {
			name: input.name,
			description: input.description,
			goals: [],
			targetAudience: [],
			objectives: [],
			scope: [],
			constraints: [],
			status: "draft",
		},
		requirements: [],
		assumptions: [],
		decisions: [],
		unresolvedQuestions: [],
		risks: [],
		constraints: [],
		modules: [],
		screens: [],
		frontend: {
			applicationStructure: [],
			components: [],
			routes: [],
			stateResponsibilities: [],
			integrations: [],
		},
		backend: {
			services: [],
			operations: [],
			backgroundJobs: [],
			events: [],
		},
		database: {
			entities: [],
			relationships: [],
			enums: [],
		},
		apis: [],
		workflows: [],
		architecture: {
			components: [],
			relationships: [],
		},
		security: {
			authentication: [],
			authorization: [],
			roles: [],
			permissions: [],
			requirements: [],
			threatConsiderations: [],
		},
		documentation: [],
	});
}
