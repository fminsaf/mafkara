import { createFileRoute } from "@tanstack/react-router";
import { AuthPanel } from "#/components/auth/auth-panel";
import { AuthShell } from "#/components/auth/auth-shell";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	return (
		<AuthShell>
			<AuthPanel mode="login" />
		</AuthShell>
	);
}
