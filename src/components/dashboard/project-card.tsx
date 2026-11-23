import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Layers3 } from "lucide-react";

export interface ProjectSummary {
	id: string;
	name: string;
	description: string;
	status: string;
	updatedAt: string;
}

export function ProjectCard({ project }: { project: ProjectSummary }) {
	const updated = new Intl.DateTimeFormat("en", {
		dateStyle: "medium",
		timeZone: "UTC",
	}).format(new Date(project.updatedAt));

	return (
		<Link
			className="project-card"
			params={{ projectId: project.id }}
			to="/dashboard/projects/$projectId"
		>
			<div className="project-card-top">
				<span className="project-icon">
					<Layers3 aria-hidden="true" size={18} />
				</span>
				<span className="project-status">
					<i /> {project.status}
				</span>
			</div>
			<h3>{project.name}</h3>
			<p>{project.description || "Add context to help shape your project."}</p>
			<div className="project-card-bottom">
				<span>Updated {updated}</span>
				<ArrowUpRight aria-hidden="true" size={15} />
			</div>
		</Link>
	);
}
