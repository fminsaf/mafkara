import { z } from "zod";

export const CreateProjectSchema = z.object({
	name: z.string().trim().min(1, "Enter a project name.").max(80),
	description: z.string().trim().max(500).default(""),
	initialIdea: z.string().trim().max(5000).default(""),
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
