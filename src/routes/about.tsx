import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Orbit } from "lucide-react";

export const Route = createFileRoute("/about")({
	component: AboutPage,
});

function AboutPage() {
	return (
		<main className="simple-page">
			<header className="simple-header page-wrap">
				<Link aria-label="Mafkara home" className="brand-lockup" to="/">
					<span aria-hidden="true" className="brand-mark">
						<Orbit size={19} />
					</span>
					<span>
						<span className="brand-name">mafkara</span>
						<span className="brand-arabic">مفكرة</span>
					</span>
				</Link>
				<Link className="back-link" to="/">
					<ArrowLeft aria-hidden="true" size={15} /> Back home
				</Link>
			</header>
			<article className="simple-content">
				<p className="eyebrow">About Mafkara · مفكرة</p>
				<h1>Thoughtful systems start with a conversation.</h1>
				<p className="simple-lede">
					Mafkara is an AI-powered system designer from NoonFa. It helps people
					turn software ideas into structured plans by bringing requirements,
					architecture, data, interfaces, and workflows into one connected
					model.
				</p>
				<div className="simple-rule" />
				<h2>Designed for the curious</h2>
				<p>
					You do not need to arrive with a finished technical plan. Start with
					what you want to make and who it is for. Mafkara is being built to ask
					useful questions, make trade-offs understandable, and keep every
					meaningful design change visible and reviewable.
				</p>
				<h2>A blueprint, not a black box</h2>
				<p>
					The goal is not to generate a pile of disconnected documents. Each
					view should grow from the same project model, so a change to one part
					of the design can be understood in the context of the whole system.
				</p>
				<Link className="button-link button-link-dark simple-cta" to="/signup">
					Start with an idea <ArrowRight aria-hidden="true" size={16} />
				</Link>
			</article>
		</main>
	);
}
