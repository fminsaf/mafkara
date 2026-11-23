import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { ProjectCard } from "#/components/dashboard/project-card";
import { Button } from "#/components/ui/button";
import { listProjectsFn } from "#/server/projects.functions";

export const Route = createFileRoute("/dashboard/projects/")({
	loader: () => listProjectsFn(),
	component: ProjectsPage,
});

function ProjectsPage() {
	const projects = Route.useLoaderData();

	return (
		<div className="dashboard-page">
			<div className="page-back-row">
				<Link className="back-link" to="/dashboard">
					<ArrowLeft aria-hidden="true" size={15} /> Dashboard
				</Link>
			</div>
			<section className="projects-heading">
				<div>
					<p className="eyebrow">Your design space</p>
					<h1>Projects</h1>
					<p>Every idea, conversation, and blueprint in one place.</p>
				</div>
				<Button asChild size="lg">
					<Link to="/dashboard/projects/new">
						<Plus aria-hidden="true" size={17} /> New project
					</Link>
				</Button>
			</section>

			{projects.length ? (
				<div className="project-grid">
					{projects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			) : (
				<div className="empty-projects empty-projects-large">
					<h2>Nothing on the canvas yet.</h2>
					<p>Create a project and give your idea a place to grow.</p>
					<Button asChild>
						<Link to="/dashboard/projects/new">
							Create a project <ArrowRight aria-hidden="true" size={15} />
						</Link>
					</Button>
				</div>
			)}
		</div>
	);
}
