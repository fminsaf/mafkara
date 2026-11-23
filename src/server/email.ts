import { waitUntil } from "@vercel/functions";
import { Resend } from "resend";
import { getServerEnv } from "./env";

function escapeHtml(value: string): string {
	return value.replace(/[&<>"']/g, (character) => {
		const entities: Record<string, string> = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
		};

		return entities[character] ?? character;
	});
}

export async function sendAccountEmail(input: {
	to: string;
	subject: string;
	heading: string;
	message: string;
	actionLabel: string;
	actionUrl: string;
}) {
	const { RESEND_API_KEY, RESEND_FROM_EMAIL } = getServerEnv();

	if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
		throw new Error(
			"Email delivery is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL.",
		);
	}

	const resend = new Resend(RESEND_API_KEY);
	const heading = escapeHtml(input.heading);
	const message = escapeHtml(input.message);
	const actionLabel = escapeHtml(input.actionLabel);
	const actionUrl = escapeHtml(input.actionUrl);
	const { error } = await resend.emails.send({
		from: RESEND_FROM_EMAIL,
		to: input.to,
		subject: input.subject,
		text: `${input.heading}\n\n${input.message}\n\n${input.actionLabel}: ${input.actionUrl}`,
		html: `<div style="background:#f4f7f5;padding:40px 16px;font-family:Arial,sans-serif;color:#14231f"><div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e1e9e4;border-radius:16px;padding:32px"><p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#357967;font-weight:700">MAFKARA · مفكرة</p><h1 style="font-size:24px;margin:24px 0 12px">${heading}</h1><p style="font-size:15px;line-height:1.6;color:#53645c">${message}</p><a href="${actionUrl}" style="display:inline-block;margin-top:16px;padding:12px 18px;border-radius:9px;background:#1a493e;color:#fff;text-decoration:none;font-weight:700">${actionLabel}</a><p style="font-size:12px;line-height:1.6;color:#78877f;margin-top:28px">If you did not request this, you can safely ignore this message.</p></div></div>`,
	});

	if (error) {
		throw new Error(`Resend failed to deliver account email: ${error.message}`);
	}
}

export function queueAccountEmail(
	kind: "verification" | "password reset",
	input: Parameters<typeof sendAccountEmail>[0],
): Promise<void> {
	const delivery = sendAccountEmail(input).catch((error: unknown) => {
		reportEmailFailure(kind, error);
	});

	if (process.env.VERCEL) {
		waitUntil(delivery);
	} else {
		void delivery;
	}

	return Promise.resolve();
}

export function reportEmailFailure(
	kind: "verification" | "password reset",
	error: unknown,
) {
	const reason = error instanceof Error ? error.name : "UnknownError";
	console.error(`Mafkara ${kind} email could not be delivered (${reason}).`);
}
