import { createFileRoute } from "@tanstack/react-router";
import { AuthPanel } from "#/components/auth/auth-panel";
import { AuthShell } from "#/components/auth/auth-shell";

export const Route = createFileRoute("/forgot-password")({
	component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
	return (
		<AuthShell>
			<AuthPanel mode="forgot-password" />
		</AuthShell>
	);
}
