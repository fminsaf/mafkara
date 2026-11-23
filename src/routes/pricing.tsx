import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Orbit } from "lucide-react";

export const Route = createFileRoute("/pricing")({
	component: PricingPage,
});

function PricingPage() {
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
				<p className="eyebrow">Mafkara plans</p>
				<h1>Good ideas deserve room to grow.</h1>
				<p className="simple-lede">
					We&apos;re shaping a fair, transparent way to use Mafkara. Plans and
					usage details will be shared here as the product takes shape.
				</p>
				<div className="pricing-note">
					<span className="pricing-note-dot" />
					Pricing details are coming soon.
				</div>
				<Link className="button-link button-link-dark simple-cta" to="/signup">
					Create your account <ArrowRight aria-hidden="true" size={16} />
				</Link>
			</article>
		</main>
	);
}
