import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Layers3, Orbit, Workflow } from "lucide-react";

export function AuthShell({ children }: { children: React.ReactNode }) {
	return (
		<main className="auth-page">
			<header className="auth-header">
				<Link aria-label="Mafkara home" className="brand-lockup" to="/">
					<span aria-hidden="true" className="brand-mark">
						<Orbit size={19} strokeWidth={2.2} />
					</span>
					<span>
						<span className="brand-name">mafkara</span>
						<span className="brand-arabic">مفكرة</span>
					</span>
				</Link>
				<Link className="auth-help-link" to="/about">
					What is Mafkara? <ArrowUpRight aria-hidden="true" size={14} />
				</Link>
			</header>

			<div className="auth-grid">
				<section className="auth-aside">
					<div className="auth-aside-content">
						<p className="eyebrow">From first thought to full blueprint</p>
						<h2 className="auth-aside-title">
							Big ideas deserve
							<br />
							<span>a thoughtful plan.</span>
						</h2>
						<p className="auth-aside-description">
							Talk through what you want to build. Mafkara helps turn the moving
							parts into a clear, connected software design.
						</p>
						<div
							aria-label="A preview of a system design"
							className="auth-preview"
							role="img"
						>
							<div className="preview-toolbar">
								<span className="preview-dot" />
								<span className="preview-dot" />
								<span className="preview-dot" />
								<span className="preview-toolbar-label">project blueprint</span>
							</div>
							<div className="preview-canvas">
								<div className="preview-node preview-node-main">
									<Orbit size={15} />
									<span>your idea</span>
								</div>
								<div className="preview-connectors">
									<i />
									<i />
									<i />
								</div>
								<div className="preview-nodes">
									<div className="preview-node">
										<Layers3 size={15} />
										<span>architecture</span>
									</div>
									<div className="preview-node">
										<Workflow size={15} />
										<span>user journeys</span>
									</div>
								</div>
								<div className="preview-caption">
									One model. Every view connected.
								</div>
							</div>
						</div>
					</div>
					<p className="auth-aside-footer">
						Thoughtful systems start with a conversation.
					</p>
				</section>

				<section className="auth-main">
					<div className="auth-main-content">{children}</div>
				</section>
			</div>
		</main>
	);
}
