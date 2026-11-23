import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, LoaderCircle, Sparkles } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { createProjectFn } from "#/server/projects.functions";

export const Route = createFileRoute("/dashboard/projects/new")({
	component: NewProjectPage,
});

function NewProjectPage() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [initialIdea, setInitialIdea] = useState("");
	const [pending, setPending] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	async function createProject(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setPending(true);
		setError("");

		try {
			const project = await createProjectFn({
				data: { name, description, initialIdea },
			});

			await navigate({
				to: "/dashboard/projects/$projectId",
				params: { projectId: project.id },
			});
		} catch {
			setError("We could not save your project. Please try again.");
		} finally {
			setPending(false);
		}
	}

	return (
		<div className="dashboard-page new-project-page">
			<div className="page-back-row">
				<Link className="back-link" to="/dashboard/projects">
					<ArrowLeft aria-hidden="true" size={15} /> All projects
				</Link>
			</div>
			<div className="project-create-layout">
				<div className="project-create-intro">
					<p className="eyebrow">
						<Sparkles aria-hidden="true" size={13} /> A good beginning
					</p>
					<h1>
						What are you <em>imagining?</em>
					</h1>
					<p>
						Start with a name and a few words. Your first thought will be saved
						with the project so you can keep building on it.
					</p>
					<div className="idea-prompt-card">
						<span className="idea-prompt-mark">“</span>
						<p>
							I want to make something that helps people find and join local
							community gardens.
						</p>
					</div>
				</div>

				<form className="project-create-form" onSubmit={createProject}>
					<div className="project-form-heading">
						<span className="form-step">01</span>
						<div>
							<h2>Give your idea a home.</h2>
							<p>You can refine the details as the design takes shape.</p>
						</div>
					</div>

					<label className="field-label" htmlFor="project-name">
						Project name <span aria-hidden="true">*</span>
						<Input
							autoFocus
							id="project-name"
							maxLength={80}
							onChange={(event) => setName(event.target.value)}
							placeholder="Community Garden Finder"
							required
							value={name}
						/>
					</label>

					<label className="field-label">
						Short description <span className="optional-label">Optional</span>
						<textarea
							className="form-textarea"
							maxLength={500}
							onChange={(event) => setDescription(event.target.value)}
							placeholder="A simple way for neighbors to find and grow community gardens."
							rows={3}
							value={description}
						/>
					</label>

					<label className="field-label">
						Your first thought <span className="optional-label">Optional</span>
						<textarea
							className="form-textarea"
							maxLength={5000}
							onChange={(event) => setInitialIdea(event.target.value)}
							placeholder="Who is this for? What would you like it to help them do?"
							rows={5}
							value={initialIdea}
						/>
						<span className="field-hint">
							A sentence is enough. You can add detail later.
						</span>
					</label>

					{error && (
						<p aria-live="polite" className="form-message form-message-error">
							{error}
						</p>
					)}

					<div className="project-form-actions">
						<Button asChild size="sm" variant="ghost">
							<Link to="/dashboard/projects">Cancel</Link>
						</Button>
						<Button disabled={pending || !name.trim()} size="lg" type="submit">
							{pending ? (
								<LoaderCircle aria-hidden="true" className="animate-spin" />
							) : (
								<>
									Create project
									<ArrowRight aria-hidden="true" />
								</>
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
