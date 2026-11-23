import { createFileRoute } from "@tanstack/react-router";
import { AuthPanel } from "#/components/auth/auth-panel";
import { AuthShell } from "#/components/auth/auth-shell";

export const Route = createFileRoute("/signup")({
	component: SignupPage,
});

function SignupPage() {
	return (
		<AuthShell>
			<AuthPanel mode="signup" />
		</AuthShell>
	);
}
