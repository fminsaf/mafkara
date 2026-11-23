import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LoaderCircle, MailCheck } from "lucide-react";
import { type FormEvent, useState } from "react";
import { AuthShell } from "#/components/auth/auth-shell";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/verify-email")({
	component: VerifyEmailPage,
});

function VerifyEmailPage() {
	const [email, setEmail] = useState("");
	const [pending, setPending] = useState(false);
	const [error, setError] = useState("");
	const [notice, setNotice] = useState("");

	async function resendVerification(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setPending(true);
		setError("");
		setNotice("");

		try {
			const result = await authClient.sendVerificationEmail({
				email: email.trim(),
				callbackURL: "/dashboard",
			});

			if (result.error) {
				setError("We could not send a verification link. Please try again.");
				return;
			}

			setNotice(
				"If that account needs verification, a new link is on its way.",
			);
		} catch {
			setError(
				"We could not reach Mafkara. Check your connection and try again.",
			);
		} finally {
			setPending(false);
		}
	}

	return (
		<AuthShell>
			<div className="auth-card">
				<div className="auth-card-icon" aria-hidden="true">
					<MailCheck size={19} />
				</div>
				<p className="eyebrow">One quick check</p>
				<h1 className="auth-title">Check your inbox.</h1>
				<p className="auth-description">
					We sent a verification link to the address you used to sign up. Open
					it to activate your account and continue to Mafkara.
				</p>

				<form className="auth-form" onSubmit={resendVerification}>
					<label className="field-label" htmlFor="verification-email">
						Didn&apos;t receive it? Send another link
						<Input
							autoComplete="email"
							id="verification-email"
							onChange={(event) => setEmail(event.target.value)}
							placeholder="you@example.com"
							required
							type="email"
							value={email}
						/>
					</label>

					{error && (
						<p aria-live="polite" className="form-message form-message-error">
							{error}
						</p>
					)}
					{notice && (
						<p aria-live="polite" className="form-message form-message-success">
							{notice}
						</p>
					)}

					<Button className="auth-submit" disabled={pending} size="lg">
						{pending ? (
							<LoaderCircle aria-hidden="true" className="animate-spin" />
						) : (
							<>
								Resend verification email
								<ArrowRight aria-hidden="true" />
							</>
						)}
					</Button>
				</form>

				<div className="auth-alternate">
					<Link className="back-link" to="/login">
						Back to sign in
					</Link>
				</div>
			</div>
		</AuthShell>
	);
}
