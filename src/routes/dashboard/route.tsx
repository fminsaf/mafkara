import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { DashboardShell } from "#/components/dashboard/dashboard-shell";
import { getSessionFn } from "#/server/auth.functions";

export const Route = createFileRoute("/dashboard")({
	headers: () => ({ "Cache-Control": "private, no-store" }),
	beforeLoad: async () => {
		const session = await getSessionFn();

		if (!session) {
			throw redirect({ to: "/login" });
		}

		return { session };
	},
	component: DashboardLayout,
});

function DashboardLayout() {
	const { session } = Route.useRouteContext();

	return (
		<DashboardShell
			email={session.user.email}
			name={session.user.name || "Mafkara member"}
		>
			<Outlet />
		</DashboardShell>
	);
}
