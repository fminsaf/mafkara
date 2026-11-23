import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, LoaderCircle, LockKeyhole } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { authClient } from "#/lib/auth-client";

type AuthMode = "login" | "signup" | "forgot-password" | "reset-password";

const copy: Record<
	AuthMode,
	{ eyebrow: string; title: string; description: string; submit: string }
> = {
	login: {
		eyebrow: "Welcome back",
		title: "Pick up where your ideas left off.",
		description: "Sign in to return to your software blueprints.",
		submit: "Sign in",
	},
	signup: {
		eyebrow: "Your next idea starts here",
		title: "Make room for a better plan.",
		description: "Create an account and start shaping your next software idea.",
		submit: "Create account",
	},
	"forgot-password": {
		eyebrow: "Account recovery",
		title: "A fresh start is one email away.",
		description:
			"We will send a secure password reset link if the account exists.",
		submit: "Send reset link",
	},
	"reset-password": {
		eyebrow: "Account recovery",
		title: "Choose a new password.",
		description: "Use at least eight characters for your new password.",
		submit: "Update password",
	},
};

export function AuthPanel({ mode, token }: { mode: AuthMode; token?: string }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [pending, setPending] = useState(false);
	const [error, setError] = useState("");
	const [notice, setNotice] = useState("");
	const navigate = useNavigate();
	const text = copy[mode];

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setPending(true);
		setError("");
		setNotice("");

		try {
			if (mode === "signup") {
				const result = await authClient.signUp.email({
					name: name.trim(),
					email: email.trim(),
					password,
					callbackURL: "/dashboard",
				});

				if (result.error) {
					setError(
						result.error.message ?? "Your account could not be created.",
					);
					return;
				}

				await navigate({ to: "/verify-email" });
			} else if (mode === "login") {
				const result = await authClient.signIn.email({
					email: email.trim(),
					password,
					callbackURL: "/dashboard",
				});

				if (result.error) {
					setError(
						result.error.status === 403
							? "Verify your email address before signing in."
							: "We could not sign you in with those details.",
					);
					return;
				}

				await navigate({ to: "/dashboard" });
			} else if (mode === "forgot-password") {
				const result = await authClient.requestPasswordReset({
					email: email.trim(),
					redirectTo: `${window.location.origin}/reset-password`,
				});

				if (result.error) {
					setError("We could not send a reset email. Please try again.");
					return;
				}

				setNotice(
					"If an account matches that email, a secure reset link is on its way.",
				);
			} else if (token) {
				const result = await authClient.resetPassword({
					newPassword: password,
					token,
				});

				if (result.error) {
					setError("This reset link is invalid or expired. Request a new one.");
					return;
				}

				setNotice("Your password has been updated. You can now sign in.");
				await navigate({ to: "/login" });
			} else {
				setError("This reset link is missing or invalid. Request a new one.");
			}
		} catch {
			setError(
				"We could not reach Mafkara. Check your connection and try again.",
			);
		} finally {
			setPending(false);
		}
	}

	return (
		<div className="auth-card">
			<div className="auth-card-icon" aria-hidden="true">
				<LockKeyhole size={19} />
			</div>
			<p className="eyebrow">{text.eyebrow}</p>
			<h1 className="auth-title">{text.title}</h1>
			<p className="auth-description">{text.description}</p>

			<form className="auth-form" onSubmit={handleSubmit}>
				{mode === "signup" && (
					<label className="field-label" htmlFor="signup-name">
						Your name
						<Input
							autoComplete="name"
							id="signup-name"
							maxLength={100}
							onChange={(event) => setName(event.target.value)}
							placeholder="Amina Hassan"
							required
							value={name}
						/>
					</label>
				)}

				{(mode === "login" ||
					mode === "signup" ||
					mode === "forgot-password") && (
					<label className="field-label" htmlFor="account-email">
						Email address
						<Input
							autoComplete="email"
							id="account-email"
							onChange={(event) => setEmail(event.target.value)}
							placeholder="you@example.com"
							required
							type="email"
							value={email}
						/>
					</label>
				)}

				{(mode === "login" ||
					mode === "signup" ||
					mode === "reset-password") && (
					<label className="field-label" htmlFor="account-password">
						{mode === "reset-password" ? "New password" : "Password"}
						<Input
							autoComplete={
								mode === "login" ? "current-password" : "new-password"
							}
							id="account-password"
							minLength={8}
							onChange={(event) => setPassword(event.target.value)}
							placeholder="At least 8 characters"
							required
							type="password"
							value={password}
						/>
					</label>
				)}

				{mode === "login" && (
					<div className="form-trailing-link">
						<Link to="/forgot-password">Forgot password?</Link>
					</div>
				)}

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
							{text.submit}
							<ArrowRight aria-hidden="true" />
						</>
					)}
				</Button>
			</form>

			<div className="auth-alternate">
				{mode === "login" ? (
					<span>
						New to Mafkara? <Link to="/signup">Create an account</Link>
					</span>
				) : mode === "signup" ? (
					<span>
						Already have an account? <Link to="/login">Sign in</Link>
					</span>
				) : (
					<Link className="back-link" to="/login">
						<ArrowLeft aria-hidden="true" size={15} />
						Back to sign in
					</Link>
				)}
			</div>
		</div>
	);
}
