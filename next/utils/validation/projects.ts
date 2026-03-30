import { z } from "zod";

export const SkillSchema = z.object({
	id: z.string(),
	name: z.string(),
	inner_color: z.string(),
	outer_color: z.string(),
});

export const RoleInfoSchema = z.object({
	description: z.string().nullable(),
	skills: z.array(SkillSchema),
	requiredSkills: z.array(SkillSchema),
});

export const AreaSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export const SubmitProjectSchema = z.object({
	name: z.string(),
	description: z.string(),
	areasOfInterest: z.array(AreaSchema),
	roles: z.record(z.string(), RoleInfoSchema),
	skill_level: z.string().nullable().optional(),
	github_repository: z.string().nullable().optional(),
});
