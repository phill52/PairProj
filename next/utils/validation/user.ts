import { z } from "zod";

export const SubmitProfileZSchema = z.object({
	name: z
		.string()
		.trim()
		.min(3, "Name must be at least 3 characters")
		.max(30, "Name must be at most 30 characters")
		.nullable(),
	email: z.string().email("Invalid email").nullable(),
	image: z.string().url("Invalid image URL").nullable(),
	areasOfInterest: z
		.array(z.string().min(1, "Invalid area ID"))
		.min(1, "Select at least one area"),
	skills: z
		.array(
			z.object({
				skillId: z.string().min(1, "Invalid skill ID"),
				skillLevel: z.string().min(1, "Skill level required"),
			}),
		)
		.min(1, "Select at least one skill"),
	education: z.array(
		z.object({
			school: z
				.string()
				.trim()
				.min(2, "School name too short")
				.max(100),

			level: z
				.string()
				.trim()
				.min(1, "Level required")
				.max(100),

			date: z
				.string()
				.trim()
				.min(1, "Date required"),

			description: z
				.string()
				.trim()
				.max(500)
				.optional(),
		}),
	),
	experience: z.array(
		z.object({
			employer: z
				.string()
				.trim()
				.min(2, "Employer required")
				.max(100),
			position: z
				.string()
				.trim()
				.min(1, "Position required")
				.max(100),
			date: z
				.string()
				.trim()
				.min(1, "Date required"),
			description: z
				.string()
				.trim()
				.max(1000)
				.optional(),
		}),
	),
});