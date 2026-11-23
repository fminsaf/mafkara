import { describe, expect, it } from "vitest";
import { createInitialSystemModel, SystemModelSchema } from "./schema";

describe("Mafkara System Model", () => {
	it("creates a fully validated empty model for a new project", () => {
		const model = createInitialSystemModel({
			name: "Garden Finder",
			description: "Help neighbors find local gardens.",
		});

		expect(SystemModelSchema.parse(model)).toEqual(model);
		expect(model.project.status).toBe("draft");
		expect(model.requirements).toEqual([]);
		expect(model.database.entities).toEqual([]);
	});

	it("rejects unknown top-level fields and unsupported schema versions", () => {
		const model = createInitialSystemModel({
			name: "Garden Finder",
			description: "",
		});

		expect(
			SystemModelSchema.safeParse({ ...model, schemaVersion: 2 }).success,
		).toBe(false);
		expect(
			SystemModelSchema.safeParse({ ...model, arbitrary: "unvalidated" })
				.success,
		).toBe(false);
	});
});
