import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AuthPanel } from "#/components/auth/auth-panel";
import { AuthShell } from "#/components/auth/auth-shell";

export const Route = createFileRoute("/reset-password")({
	validateSearch: z.object({
		token: z.string().optional(),
	}),
	component: ResetPasswordPage,
});

function ResetPasswordPage() {
	const { token } = Route.useSearch();

	return (
		<AuthShell>
			<AuthPanel mode="reset-password" token={token} />
		</AuthShell>
	);
}
