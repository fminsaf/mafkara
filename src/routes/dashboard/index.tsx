import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lightbulb, Plus, Sparkles } from "lucide-react";
import { ProjectCard } from "#/components/dashboard/project-card";
import { Button } from "#/components/ui/button";
import { listProjectsFn } from "#/server/projects.functions";

export const Route = createFileRoute("/dashboard/")({
	loader: () => listProjectsFn(),
	component: DashboardHome,
});

function DashboardHome() {
	const projects = Route.useLoaderData();

	return (
		<div className="dashboard-page">
			<section className="dashboard-welcome">
				<div>
					<p className="eyebrow">
						<Sparkles aria-hidden="true" size={13} /> Your design space
					</p>
					<h1>
						Make a little room for <em>what&apos;s next.</em>
					</h1>
					<p className="dashboard-lede">
						Start with an idea. Mafkara helps turn it into a clear, connected
						software blueprint.
					</p>
				</div>
				<Button asChild className="create-project-button" size="lg">
					<Link to="/dashboard/projects/new">
						<Plus aria-hidden="true" size={17} />
						New project
					</Link>
				</Button>
			</section>

			<section
				aria-labelledby="recent-projects-title"
				className="dashboard-projects"
			>
				<div className="section-heading">
					<div>
						<p className="eyebrow">Your work</p>
						<h2 id="recent-projects-title">Recent projects</h2>
					</div>
					{projects.length > 0 && (
						<Link className="text-link" to="/dashboard/projects">
							All projects <ArrowRight aria-hidden="true" size={14} />
						</Link>
					)}
				</div>

				{projects.length > 0 ? (
					<div className="project-grid">
						{projects.slice(0, 3).map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				) : (
					<div className="empty-projects">
						<div className="empty-project-icon">
							<Lightbulb aria-hidden="true" size={20} />
						</div>
						<h3>Your next idea can start here.</h3>
						<p>
							Projects keep your conversations and system blueprints together.
							Share a name and a first thought to get going.
						</p>
						<Button asChild size="sm" variant="outline">
							<Link to="/dashboard/projects/new">
								Create your first project{" "}
								<ArrowRight aria-hidden="true" size={14} />
							</Link>
						</Button>
					</div>
				)}
			</section>

			<section
				aria-labelledby="getting-started-title"
				className="getting-started"
			>
				<div className="getting-started-mark">
					<Lightbulb aria-hidden="true" size={18} />
				</div>
				<div>
					<p className="eyebrow">A helpful first step</p>
					<h2 id="getting-started-title">
						You don&apos;t need the technical answers yet.
					</h2>
					<p>
						Start by describing the people you want to help and the problem you
						want to solve.
					</p>
				</div>
				<Link
					aria-label="Create a project"
					className="round-arrow-link"
					to="/dashboard/projects/new"
				>
					<ArrowRight aria-hidden="true" size={17} />
				</Link>
			</section>
		</div>
	);
}
