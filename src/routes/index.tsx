import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowDown,
	ArrowRight,
	ArrowUpRight,
	Blocks,
	CircleHelp,
	Database,
	GitBranch,
	Orbit,
	Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
	component: Home,
});

function Brand() {
	return (
		<Link aria-label="Mafkara home" className="brand-lockup" to="/">
			<span aria-hidden="true" className="brand-mark">
				<Orbit size={19} strokeWidth={2.2} />
			</span>
			<span>
				<span className="brand-name">mafkara</span>
				<span className="brand-arabic">مفكرة</span>
			</span>
		</Link>
	);
}

function Home() {
	return (
		<main className="marketing-page">
			<header className="site-header page-wrap">
				<Brand />
				<nav aria-label="Main navigation" className="site-nav">
					<Link to="/about">About</Link>
					<Link to="/pricing">Pricing</Link>
				</nav>
				<div className="site-actions">
					<Link className="site-signin" to="/login">
						Sign in
					</Link>
					<Link className="button-link button-link-dark" to="/signup">
						Start designing <ArrowRight aria-hidden="true" size={16} />
					</Link>
				</div>
			</header>

			<section aria-labelledby="hero-heading" className="hero page-wrap">
				<div className="hero-copy rise-in">
					<div className="hero-label">
						<Sparkles aria-hidden="true" size={14} />
						<span>Your idea, thoughtfully designed</span>
					</div>
					<h1 id="hero-heading">
						From a big idea
						<br />
						to a <span>clear blueprint.</span>
					</h1>
					<p className="hero-description">
						Meet your AI system designer. Talk through what you want to build
						and turn the possibilities into a connected software plan.
					</p>
					<div className="hero-actions">
						<Link
							className="button-link button-link-dark button-link-large"
							to="/signup"
						>
							Design your first project
							<ArrowRight aria-hidden="true" size={17} />
						</Link>
						<Link className="hero-secondary-link" to="/about">
							Get to know Mafkara <ArrowUpRight aria-hidden="true" size={15} />
						</Link>
					</div>
					<p className="hero-footnote">
						Start with a sentence. No architecture expertise required.
					</p>
				</div>

				<div
					className="hero-visual rise-in"
					role="img"
					aria-label="A visual map connecting an idea to system requirements, architecture, and data design"
				>
					<div className="visual-topbar">
						<div className="visual-window-dots" aria-hidden="true">
							<i />
							<i />
							<i />
						</div>
						<span>your project · system map</span>
						<span className="visual-live">
							<i /> living model
						</span>
					</div>
					<div className="visual-canvas">
						<div className="visual-orbit orbit-one" />
						<div className="visual-orbit orbit-two" />
						<svg
							className="visual-lines"
							viewBox="0 0 540 380"
							aria-hidden="true"
						>
							<path d="M265 184 C195 165 170 130 122 104" />
							<path d="M275 184 C350 157 372 122 423 104" />
							<path d="M267 204 C199 231 168 270 124 290" />
							<path d="M279 203 C348 231 380 270 425 290" />
						</svg>
						<div className="visual-center-card">
							<span className="visual-center-icon">
								<Orbit size={19} />
							</span>
							<span className="visual-card-title">Your idea</span>
							<span className="visual-card-subtitle">
								A community garden app
							</span>
						</div>
						<div className="visual-node visual-node-requirements">
							<span className="visual-node-icon icon-lilac">
								<CircleHelp size={15} />
							</span>
							<span>
								<b>Requirements</b>
								<small>Who is it for?</small>
							</span>
						</div>
						<div className="visual-node visual-node-architecture">
							<span className="visual-node-icon icon-blue">
								<Blocks size={15} />
							</span>
							<span>
								<b>Architecture</b>
								<small>Connected services</small>
							</span>
						</div>
						<div className="visual-node visual-node-data">
							<span className="visual-node-icon icon-amber">
								<Database size={15} />
							</span>
							<span>
								<b>Database</b>
								<small>Places &amp; people</small>
							</span>
						</div>
						<div className="visual-node visual-node-workflows">
							<span className="visual-node-icon icon-green">
								<GitBranch size={15} />
							</span>
							<span>
								<b>User journeys</b>
								<small>From browse to join</small>
							</span>
						</div>
						<div className="visual-coordinate">MODEL · REVISION 01</div>
					</div>
					<div className="visual-caption">
						<span>
							<i /> One source of truth
						</span>
						<span>
							<ArrowDown aria-hidden="true" size={14} /> Follow the connections
						</span>
					</div>
				</div>
			</section>

			<section
				aria-labelledby="philosophy-heading"
				className="philosophy page-wrap"
			>
				<div>
					<p className="eyebrow">A better way to get started</p>
					<h2 id="philosophy-heading">
						You bring the <em>why.</em>
						<br />
						Mafkara helps shape the <em>how.</em>
					</h2>
				</div>
				<p>
					Good software starts with good questions. Explore the pieces of your
					idea through conversation, see how they fit together, and stay in
					control of every design decision.
				</p>
			</section>

			<section
				aria-label="How Mafkara helps"
				className="capabilities page-wrap"
			>
				<article className="capability-card">
					<span className="capability-number">01</span>
					<h3>Think it through</h3>
					<p>
						Turn a rough thought into clear goals, requirements, and decisions.
					</p>
				</article>
				<article className="capability-card">
					<span className="capability-number">02</span>
					<h3>See the whole system</h3>
					<p>
						Connect screens, services, data, and user journeys in one blueprint.
					</p>
				</article>
				<article className="capability-card">
					<span className="capability-number">03</span>
					<h3>Stay in the driver's seat</h3>
					<p>Review proposed changes before they become part of your design.</p>
				</article>
			</section>

			<section
				aria-labelledby="closing-heading"
				className="closing-cta page-wrap"
			>
				<div>
					<p className="eyebrow">Ready when you are</p>
					<h2 id="closing-heading">Let&apos;s make your idea make sense.</h2>
				</div>
				<Link className="button-link button-link-light" to="/signup">
					Start with your idea <ArrowRight aria-hidden="true" size={16} />
				</Link>
			</section>

			<footer className="site-footer page-wrap">
				<Brand />
				<p>Thoughtful software starts with a conversation.</p>
				<span>© {new Date().getFullYear()} NoonFa</span>
			</footer>
		</main>
	);
}
