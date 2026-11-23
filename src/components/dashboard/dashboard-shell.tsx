import { Link, useNavigate } from "@tanstack/react-router";
import {
	ArrowUpRight,
	Command,
	FolderKanban,
	LogOut,
	Orbit,
	Plus,
} from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { authClient } from "#/lib/auth-client";

export function DashboardShell({
	children,
	name,
	email,
}: {
	children: React.ReactNode;
	name: string;
	email: string;
}) {
	const [signingOut, setSigningOut] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const initials = name
		.split(/\s+/)
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	async function signOut() {
		setSigningOut(true);
		setError("");

		try {
			const result = await authClient.signOut();
			if (result.error) {
				setError("Sign out failed. Please try again.");
				return;
			}

			await navigate({ to: "/login" });
		} catch {
			setError("Sign out failed. Please try again.");
		} finally {
			setSigningOut(false);
		}
	}

	return (
		<div className="app-shell">
			<header className="app-topbar">
				<div className="app-topbar-inner">
					<Link className="app-brand" to="/dashboard">
						<span className="app-brand-mark">
							<Orbit size={17} />
						</span>
						<span>mafkara</span>
						<span className="app-brand-arabic">مفكرة</span>
					</Link>
					<div className="app-breadcrumb">
						<span aria-hidden="true">/</span>
						<FolderKanban aria-hidden="true" size={14} />
						<span>Workspace</span>
					</div>
					<nav aria-label="Workspace navigation" className="app-topbar-nav">
						<Link
							activeOptions={{ exact: true }}
							activeProps={{ className: "is-active" }}
							to="/dashboard"
						>
							Overview
						</Link>
						<Link
							activeProps={{ className: "is-active" }}
							to="/dashboard/projects"
						>
							Projects
						</Link>
					</nav>
					<div className="app-user-menu">
						<div className="app-user-avatar" aria-hidden="true">
							{initials || "M"}
						</div>
						<div className="app-user-copy">
							<span>{name}</span>
							<small>{email}</small>
						</div>
						<Button
							aria-label="Sign out"
							className="app-signout"
							disabled={signingOut}
							onClick={() => void signOut()}
							size="icon-sm"
							title="Sign out"
							variant="ghost"
						>
							<LogOut aria-hidden="true" size={16} />
						</Button>
					</div>
				</div>
				{error && (
					<p aria-live="polite" className="app-alert">
						{error}
					</p>
				)}
			</header>

			<nav aria-label="Mobile workspace navigation" className="mobile-app-nav">
				<Link to="/dashboard">
					<Command size={16} /> Home
				</Link>
				<Link to="/dashboard/projects">
					<FolderKanban size={16} /> Projects
				</Link>
				<Link to="/dashboard/projects/new">
					<Plus size={16} /> New project
				</Link>
			</nav>

			<main className="app-main">{children}</main>
			<footer className="app-footer">
				<Link to="/about">
					About Mafkara <ArrowUpRight size={13} />
				</Link>
				<span>Thoughtful systems start with a conversation.</span>
			</footer>
		</div>
	);
}
