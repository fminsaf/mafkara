import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	ArrowRight,
	Braces,
	CircleHelp,
	Database,
	Layers3,
	Workflow,
} from "lucide-react";
import { getProjectFn } from "#/server/projects.functions";

export const Route = createFileRoute("/dashboard/projects/$projectId")({
	loader: ({ params }) => getProjectFn({ data: params.projectId }),
	component: ProjectWorkspace,
});

const domains = [
	{
		title: "Requirements",
		detail: "Goals, needs, and open questions",
		icon: CircleHelp,
	},
	{
		title: "Architecture",
		detail: "Services and system relationships",
		icon: Layers3,
	},
	{
		title: "Database",
		detail: "Entities, fields, and connections",
		icon: Database,
	},
	{
		title: "User journeys",
		detail: "Screens, flows, and interactions",
		icon: Workflow,
	},
	{ title: "APIs", detail: "Endpoints and data contracts", icon: Braces },
];

function ProjectWorkspace() {
	const project = Route.useLoaderData();

	return (
		<div className="dashboard-page project-workspace-page">
			<div className="page-back-row">
				<Link className="back-link" to="/dashboard/projects">
					<ArrowLeft aria-hidden="true" size={15} /> Projects
				</Link>
			</div>

			<header className="workspace-heading">
				<div>
					<p className="eyebrow">
						Project blueprint <span className="revision-pill">Revision 0</span>
					</p>
					<h1>{project.name}</h1>
					<p>{project.description || "A new idea, ready to take shape."}</p>
				</div>
				<span className="project-status">
					<i /> {project.status}
				</span>
			</header>

			<section className="workspace-start-card">
				<div className="workspace-start-icon">
					<CircleHelp aria-hidden="true" size={20} />
				</div>
				<p className="eyebrow">A thoughtful first step</p>
				<h2>Every clear blueprint begins with a good question.</h2>
				<p>
					{project.initialIdea
						? "Your starting idea is saved here. As Mafkara's conversation and design tools come online, they will help turn it into a connected system model."
						: "Tell Mafkara what you want to make and who it is for. The design begins with your context, not a technical form."}
				</p>
				{project.initialIdea && (
					<blockquote className="saved-idea">
						<span>Your starting idea</span>
						<p>{project.initialIdea}</p>
					</blockquote>
				)}
			</section>

			<section
				aria-labelledby="domains-heading"
				className="workspace-domains-section"
			>
				<div className="section-heading">
					<div>
						<p className="eyebrow">One connected model</p>
						<h2 id="domains-heading">Your system, as it takes shape.</h2>
					</div>
					<span className="model-version">MSM · v1</span>
				</div>
				<div className="domain-grid">
					{domains.map(({ title, detail, icon: Icon }) => (
						<div className="domain-card" key={title}>
							<span className="domain-icon">
								<Icon aria-hidden="true" size={17} />
							</span>
							<span className="domain-copy">
								<b>{title}</b>
								<small>{detail}</small>
							</span>
							<span className="domain-empty">Not designed</span>
						</div>
					))}
				</div>
			</section>

			<div className="workspace-note">
				<span>Next up</span>
				<p>
					The conversation designer and reviewable model changes are the next
					foundation milestone.
				</p>
				<Link to="/dashboard/projects">
					Back to projects <ArrowRight aria-hidden="true" size={14} />
				</Link>
			</div>
		</div>
	);
}
