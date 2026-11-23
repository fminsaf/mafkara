import { z } from "zod";

const serverEnvSchema = z.object({
	APP_URL: z.url().default("http://localhost:3000"),
	BETTER_AUTH_URL: z.url().default("http://localhost:3000"),
	BETTER_AUTH_SECRET: z.string().min(32),
	DATABASE_URL: z.string().min(1),
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	RESEND_API_KEY: z.preprocess(
		(value) => (value === "" ? undefined : value),
		z.string().min(1).optional(),
	),
	RESEND_FROM_EMAIL: z.preprocess(
		(value) => (value === "" ? undefined : value),
		z.string().email().optional(),
	),
	OPENROUTER_API_KEY: z.preprocess(
		(value) => (value === "" ? undefined : value),
		z.string().min(1).optional(),
	),
	OPENROUTER_MODEL: z.preprocess(
		(value) => (value === "" ? undefined : value),
		z.string().min(1).optional(),
	),
	OPENROUTER_FALLBACK_MODEL: z.preprocess(
		(value) => (value === "" ? undefined : value),
		z.string().min(1).optional(),
	),
	SENTRY_DSN: z.preprocess(
		(value) => (value === "" ? undefined : value),
		z.url().optional(),
	),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function getServerEnv(): ServerEnv {
	return serverEnvSchema.parse(process.env);
}
