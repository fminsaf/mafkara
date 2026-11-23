import { describe, expect, it } from "vitest";
import { CreateProjectSchema } from "./project-input";

describe("project creation input", () => {
	it("trims project details and defaults optional fields", () => {
		expect(CreateProjectSchema.parse({ name: "  Garden Finder  " })).toEqual({
			name: "Garden Finder",
			description: "",
			initialIdea: "",
		});
	});

	it("rejects empty names and oversized initial ideas", () => {
		expect(CreateProjectSchema.safeParse({ name: "  " }).success).toBe(false);
		expect(
			CreateProjectSchema.safeParse({
				name: "Garden Finder",
				initialIdea: "x".repeat(5001),
			}).success,
		).toBe(false);
	});
});
