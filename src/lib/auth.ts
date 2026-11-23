import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { getDb } from "#/db";
import { account, session, user, verification } from "#/db/schema";
import { queueAccountEmail } from "#/server/email";
import { getServerEnv } from "#/server/env";

function createAuth() {
	const env = getServerEnv();

	return betterAuth({
		appName: "Mafkara",
		baseURL: env.BETTER_AUTH_URL,
		secret: env.BETTER_AUTH_SECRET,
		trustedOrigins: [env.APP_URL, env.BETTER_AUTH_URL],
		database: drizzleAdapter(getDb(), {
			provider: "pg",
			schema: { user, session, account, verification },
		}),
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: true,
			revokeSessionsOnPasswordReset: true,
			sendResetPassword: ({ user: accountUser, url }) => {
				return queueAccountEmail("password reset", {
					to: accountUser.email,
					subject: "Reset your Mafkara password",
					heading: "Reset your password",
					message:
						"Use the secure link below to choose a new password for your Mafkara account.",
					actionLabel: "Reset password",
					actionUrl: url,
				});
			},
		},
		emailVerification: {
			sendOnSignUp: true,
			autoSignInAfterVerification: true,
			sendVerificationEmail: ({ user: accountUser, url }) => {
				return queueAccountEmail("verification", {
					to: accountUser.email,
					subject: "Verify your Mafkara email",
					heading: "Welcome to Mafkara",
					message:
						"Confirm your email address to start turning your idea into a software blueprint.",
					actionLabel: "Verify email",
					actionUrl: url,
				});
			},
		},
		advanced: {
			useSecureCookies: env.NODE_ENV === "production",
		},
		plugins: [tanstackStartCookies()],
	});
}

type AuthInstance = ReturnType<typeof createAuth>;

let authInstance: AuthInstance | undefined;

export function getAuth(): AuthInstance {
	if (!authInstance) {
		authInstance = createAuth();
	}

	return authInstance;
}
