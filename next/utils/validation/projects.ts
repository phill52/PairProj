import { z } from "zod";

export const SkillSchema = z.object({
	id: z.string(),
	name: z.string(),
	innerColor: z.string(),
	outerColor: z.string(),
});

export const RoleInfoSchema = z.object({
	description: z.string().nullable(),
	skills: z.array(SkillSchema),
	requiredSkills: z.array(SkillSchema),
});

export const AreaSchema = z.object({
	id: z.string(),
	name: z.string(),
	innerColor: z.string(),
	outerColor: z.string(),
});

export const SubmitProjectSchema = z.object({
	name: z.string(),
	description: z.string(),
<<<<<<< HEAD
	githubLink: z.string(),
	difficulty: z.string(),
	skills: z.array(z.string()),
	areasOfInterest: z.array(z.string()),
	roles: z.array(z.object({
		name: z.string(),
		outerColor: z.string(),
		innerColor: z.string(),
		description: z.string().optional(),
		optionalSkillIds: z.array(z.string()).optional(),
		requiredSkillIds: z.array(z.string()).optional(),
	})),
=======
	areasOfInterest: z.array(AreaSchema),
	roles: z.record(z.string(), RoleInfoSchema),
	skill_level: z.string().nullable().optional(),
	github_repository: z.string().nullable().optional(),
<<<<<<< HEAD
>>>>>>> 05a448d (Improved page & updated to work with new database)
=======
>>>>>>> 05a448d (Improved page & updated to work with new database)
});
