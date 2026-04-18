"use server";

// import { eq } from "drizzle-orm";
// import { revalidatePath } from "next/cache";
// import { z } from "zod";
// import {
// 	areas_of_interest,
// 	project,
// 	skill,
// 	role,
// 	users,
// 	project_role_relationship,
// 	project_role_skill_relationship,
// } from "@/db/schema";
// import { SubmitProjectSchema } from "@/utils/validation/projects";
// import { routes } from "@/routes/routes";

// import {
// 	CreateProjectProps,
// 	SubmitProject,
// 	ProjectProps,
// } from "@/types/projects";

import { auth } from "@/lib/auth";
import db from "@/lib/prisma";
import { SubmitProject } from "@/types/projects";
import { createProject as createProjectLib } from "@/lib/projects";

export async function getCreateProjectProps() {
    
	async function safeFindMany<T>(finder: () => Promise<T[]>, name: string) {
		try {
			return await finder();
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn(`getCreateProjectProps: failed to load ${name}`, e);
			return [] as T[];
		}
	}

	const [roles, skills, areasOfInterest] = await Promise.all([
		safeFindMany(() => db.role.findMany({ select: { id: true, name: true, outerColor: true, innerColor: true } }), "roles"),
		safeFindMany(() => db.skill.findMany({ select: { id: true, name: true, outerColor: true, innerColor: true } }), "skills"),
		safeFindMany(() => db.areaOfInterest.findMany({ select: { id: true, name: true, outerColor: true, innerColor: true } }), "areasOfInterest"),
	]);

	return { roles, skills, areasOfInterest };
}

export async function createProject(submitProject: SubmitProject) {
	let session;
	try {
		session = await auth();
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error("auth() failed in createProject:", e);
		throw new Error(
			"Authentication unavailable — ensure your database has the required Auth tables/columns. Run `npx prisma migrate dev` to apply migrations."
		);
	}

	if (!session) {
		throw new Error("Not authenticated");
	}

	const userId = session.user.id;
	return await createProjectLib(userId, submitProject);
}

// export async function getProject(projectId: string): Promise<ProjectProps> {
// 	const result = await db.query.project.findFirst({
// 		where: eq(project.id, projectId),
// 		with: {
// 			roles: {
// 				with: {
// 					role: true,
// 					skills: {
// 						with: {
// 							skill: true,
// 						},
// 					},
// 				},
// 			},
// 		},
// 	});

// 	if (!result) {
// 		throw new Error("Project not found");
// 	}

// 	const transformedResult: ProjectProps = {
// 		...result,
// 		roles: result.roles.map((projectRole) => ({
// 			id: projectRole.role.id,
// 			name: projectRole.role.name,
// 			skills: projectRole.skills.map((skillRelation) => ({
// 				id: skillRelation.skill.id,
// 				name: skillRelation.skill.name,
// 				innerColor: skillRelation.skill.inner_color,
// 				outerColor: skillRelation.skill.outer_color,
// 				isRequired: skillRelation.is_required,
// 			})),
// 		})),
// 	};

// 	return transformedResult;
// }

// export async function getCreateProjectProps(): Promise<CreateProjectProps> {
// 	const roles = await db.select().from(role);
// 	const skills = await db.select().from(skill);
// 	const areasOfInterest = await db.select().from(areas_of_interest);
// 	return { roles, skills, areasOfInterest };
// }

// export async function createProject(submitProject: SubmitProject) {
// 	let validatedData: z.infer<typeof SubmitProjectSchema>;
// 	try {
// 		validatedData = SubmitProjectSchema.parse(submitProject);
// 	} catch (error) {
// 		if (error instanceof z.ZodError) {
// 			throw new Error(
// 				JSON.stringify(
// 					error.errors.map((err) => ({
// 						path: err.path.join("."),
// 						message: err.message,
// 					})),
// 				),
// 			);
// 		}
// 		console.error("Unexpected error during validation:", error);
// 		throw new Error("An unexpected error occurred during validation");
// 	}

// 	const session = await auth();
// 	if (!session) {
// 		throw new Error("Not authenticated");
// 	}

// 	const userId = session.user.id;
// 	const user = await db
// 		.select({ id: users.id })
// 		.from(users)
// 		.where(eq(users.id, userId));
// 	if (!user) {
// 		throw new Error("User not found");
// 	}

// 	await db.transaction(async (db) => {
// 		const [insertedProject] = await db
// 			.insert(project)
// 			.values({
// 				name: validatedData.name,
// 				description: validatedData.description,
// 				owner_profile_id: userId,
// 			})
// 			.returning({ id: project.id });


// 		for (const [roleName, roleInfo] of Object.entries(
// 			validatedData.roles,
// 		)) {
// 			const foundRole = await db.query.role.findFirst({
// 				where: eq(role.name, roleName),
// 			});

// 			if (!foundRole) {
// 				throw new Error(`Role ${roleName} not found`);
// 			}

// 			const [insertedProjectRole] = await db
// 				.insert(project_role_relationship)
// 				.values({
// 					project_id: insertedProject.id,
// 					role_id: foundRole.id,
// 				})
// 				.returning({ id: project_role_relationship.id });

// 			const allSkills = [...roleInfo.skills, ...roleInfo.requiredSkills];
// 			await db.insert(project_role_skill_relationship).values(
// 				allSkills.map((skillInfo) => ({
// 					project_role_id: insertedProjectRole.id,
// 					skill_id: skillInfo.id,
// 					is_required: roleInfo.requiredSkills.some(
// 						(s) => s.name === skillInfo.name,
// 					),
// 				})),
// 			);
// 		}
// 	});

// 	await revalidatePath(routes.projects.search());
// 	return { success: true };
// }
