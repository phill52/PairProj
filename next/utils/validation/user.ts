import { z } from "zod";
import { SubmitProfile } from "@/types";
export const SubmitProfileZSchema = z.object({
	username: z
		.string()
		.trim()
		.min(5, "Username must be at least 5 characters")
		.max(30, "Username must be at most 30 characters")
		.refine((value) => !/\s/.test(value), {
			message: "Username cannot contain spaces",
		}),
	first_name: z
		.string()
		.trim()
		.max(50, "First name must be at most 50 characters")
		.optional()
		.nullable(),
	last_name: z
		.string()
		.trim()
		.max(50, "Last name must be at most 50 characters")
		.optional()
		.nullable(),
	pronouns: z
		.string()
		.trim()
		.max(30, "Pronouns must be at most 30 characters")
		.optional()
		.nullable(),
	bio: z
		.string()
		.trim()
		.max(500, "Bio must be at most 500 characters")
		.optional()
		.nullable(),
	account_type: z
		.array(
			z.object({
				id: z.number().int().positive(),
				name: z.string().trim().min(1, "Role name cannot be empty"),
			}),
		)
		.min(1, "At least one account type must be selected"),
	best_skills: z.array(
		z.object({
			id: z.number().int().positive(),
			name: z.string().trim().min(1, "Skill name cannot be empty"),
			icon_location: z.string(),
			inner_color: z.string(),
			outer_color: z.string(),
		}),
	),
	all_skills: z.array(
		z.object({
			id: z.number().int().positive(),
			name: z.string().trim().min(1, "Skill name cannot be empty"),
			icon_location: z.string(),
			inner_color: z.string(),
			outer_color: z.string(),
		}),
	),
	areas: z.array(
		z.object({
			id: z.number().int().positive(),
			name: z.string().trim().min(1, "Area name cannot be empty"),
			inner_color: z.string(),
			outer_color: z.string(),
		}),
	),
	education: z.array(
		z
			.object({
				school: z
					.string()
					.trim()
					.min(5, "School name must be at least 5 characters")
					.max(100, "School name must be at most 100 characters"),
				degree: z
					.string()
					.trim()
					.min(5, "Degree must be at least 5 characters")
					.max(100, "Degree must be at most 100 characters"),
				field: z
					.string()
					.trim()
					.min(3, "Major must be at least 3 characters")
					.max(100, "Major must be at most 100 characters"),
				startDate: z.date(),
				endDate: z.date().nullable(),
			})
			.refine((data) => !data.endDate || data.startDate <= data.endDate, {
				message: "End date must be after start date",
				path: ["endDate"],
			}),
	),
	experience: z.array(
		z
			.object({
				company: z
					.string()
					.trim()
					.min(1, "Company name cannot be empty")
					.max(100, "Company name must be at most 100 characters"),
				position: z
					.string()
					.trim()
					.min(1, "Position cannot be empty")
					.max(100, "Position must be at most 100 characters"),
				description: z
					.string()
					.trim()
					.max(1000, "Description must be at most 1000 characters"),
				startDate: z.date(),
				endDate: z.date().nullable(),
			})
			.refine((data) => !data.endDate || data.startDate <= data.endDate, {
				message: "End date must be after start date",
				path: ["endDate"],
			}),
	),
});
// export function validateUser(data: any) {
// 	const user = user_valid_schema.parse(data);
// 	return user;
// }
