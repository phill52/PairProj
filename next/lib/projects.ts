import db from "@/lib/prisma";
import { getMembershipStatus } from "./utils";
import { SubmitProject, ProjectRoleCreateData } from "@/types/projects";
import { SubmitProjectSchema } from "@/utils/validation/projects.ts";
import { z } from "zod";

const OWNER_ROLE_NAME = "owner";
const OWNER_ROLE_COLORS = {
	outerColor: "#000000",
	innerColor: "#ffffff",
};

function buildRoleCreateData(
	role: Pick<
		ProjectRoleCreateData,
		| "name"
		| "outerColor"
		| "innerColor"
		| "requiredSkillIds"
		| "optionalSkillIds"
	>,
) {
	return {
		name: role.name,
		outerColor: role.outerColor,
		innerColor: role.innerColor,
		requiredSkills:
			role.requiredSkillIds && role.requiredSkillIds.length > 0
				? {
						create: role.requiredSkillIds.map((id) => ({
							skill: { connect: { id } },
						})),
					}
				: undefined,
		optionalSkills:
			role.optionalSkillIds && role.optionalSkillIds.length > 0
				? {
						create: role.optionalSkillIds.map((id) => ({
							skill: { connect: { id } },
						})),
					}
				: undefined,
	};
}

export async function getProject(id: string) {
	try {
		const project = await db.project.findUnique({
			where: { id },
			include: {
				areasOfInterest: true,
				skills: true,
				githubIssues: true,
				ProjectMembership: true,
				applications: {
					include: {
						user: true,
						role: true,
					},
				},
				roles: {
					where: {
						name: { not: OWNER_ROLE_NAME },
					},
					include: {
						requiredSkills: {
							include: { skill: true },
						},
						optionalSkills: {
							include: { skill: true },
						},
					},
				},
			},
		});
		if (!project) {
			throw new Error("Project Not Found");
		}

		return {
			...project,
			roles: project.roles.map((role) => ({
				...role,
				requiredSkills: role.requiredSkills.map(
					(required) => required.skill,
				),
				optionalSkills: role.optionalSkills.map(
					(optional) => optional.skill,
				),
			})),
		};
	} catch (e) {
		throw new Error(`Failed to fetch project: ${e}`);
	}
}

export async function createProject(
	userId: string,
	projectData: SubmitProject,
) {
	let validatedProject: z.infer<typeof SubmitProjectSchema>;
	try {
		validatedProject = SubmitProjectSchema.parse(projectData);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error(
				JSON.stringify(
					error.errors.map((err) => ({
						path: err.path.join("."),
						message: err.message,
					})),
				),
			);
		}
		throw new Error("An unexpected error occurred during validation");
	}
	try {
		const {
			name,
			description,
			githubLink,
			difficulty,
			skills,
			areasOfInterest,
			roles,
		} = validatedProject;
		const requestedRoles = (roles ?? []).filter(
			(role) => role.name.trim().toLowerCase() !== OWNER_ROLE_NAME,
		);

		return await db.$transaction(async (tx) => {
			const project = await tx.project.create({
				data: {
					name,
					description,
					githubLink,
					difficulty,
					skills: {
						connect: skills.map((id) => ({ id })),
					},
					areasOfInterest: {
						connect: areasOfInterest.map((id) => ({ id })),
					},
				},
			});

			const ownerRole = await tx.role.create({
				data: {
					name: OWNER_ROLE_NAME,
					outerColor: OWNER_ROLE_COLORS.outerColor,
					innerColor: OWNER_ROLE_COLORS.innerColor,
					project: { connect: { id: project.id } },
				},
			});

			await tx.projectMembership.create({
				data: {
					userId,
					projectId: project.id,
					roleId: ownerRole.id,
					dateJoined: new Date().toISOString(),
				},
			});

			for (const role of requestedRoles) {
				await tx.role.create({
					data: {
						...buildRoleCreateData(role),
						project: { connect: { id: project.id } },
					},
				});
			}

			return project;
		});
	} catch (e) {
		throw new Error("Failed to create project");
	}
}

// export async function updateProject(
// 	userId: string,
// 	projectId: string,
// 	name: string,
// 	githubLink: string,
// 	difficulty: string,
// 	description: string,
// 	skills: string[],
// 	areasOfInterest: string[],
// 	roles: ProjectRoleCreateData[] = [],
// ) {
// 	return db.$transaction(async (tx) => {
// 		const membership = await getMembershipStatus(tx, projectId, userId);

// 		if (!membership) {
// 			throw new Error("You are not authorized to update this project.");
// 		}

// 		const updated = await tx.project.update({
// 			where: { id: projectId },
// 			data: {
// 				name,
// 				githubLink,
// 				difficulty,
// 				description,
// 				skills: {
// 					set: skills.map((id) => ({ id })),
// 				},
// 				areasOfInterest: {
// 					set: areasOfInterest.map((id) => ({ id })),
// 				},
// 				roles: {
// 					deleteMany: {},
// 					create: roles.map((role) => ({
// 						name: role.name,
// 						outerColor: role.outerColor,
// 						innerColor: role.innerColor,
// 						requiredSkills: role.requiredSkillIds
// 							? {
// 									connect: role.requiredSkillIds.map(
// 										(id) => ({ id }),
// 									),
// 								}
// 							: undefined,
// 						optionalSkills: role.optionalSkillIds
// 							? {
// 									connect: role.optionalSkillIds.map(
// 										(id) => ({ id }),
// 									),
// 								}
// 							: undefined,
// 					})),
// 				},
// 			},
// 			include: {
// 				areasOfInterest: true,
// 				skills: true,
// 				roles: true,
// 				githubIssues: true,
// 			},
// 		});
// 		return updated;
// 	});
// }

export async function deleteProject(userId: string, projectId: string) {
	return db.$transaction(async (tx) => {
		const membership = await getMembershipStatus(tx, projectId, userId);

		if (!membership) {
			throw new Error("You are not authorized to delete this project.");
		}

		await tx.projectMembership.deleteMany({ where: { projectId } });
		await tx.projectApplication.deleteMany({ where: { projectId } });

		const deleted = await tx.project.delete({
			where: { id: projectId },
		});
		return deleted;
	});
}

export async function getRolesAppliedTo(projectId: string, userId: string) {
	try {
		const applications = await db.projectApplication.findMany({
			where: { projectId, userId },
			include: { role: true },
		});
		return applications.map((app) => app.role.id);
	} catch (e) {
		throw new Error("Failed to fetch applied roles");
	}
}

export async function lockProject(userId: string, projectId: string) {
	return db.$transaction(async (tx) => {
		const membership = await getMembershipStatus(tx, projectId, userId);

		if (!membership) {
			throw new Error("You are not authorized to lock this project.");
		}

		const updated = await tx.project.update({
			where: { id: projectId },
			data: { isLocked: true },
		});
		return updated;
	});
}

export async function unlockProject(userId: string, projectId: string) {
	return db.$transaction(async (tx) => {
		const membership = await getMembershipStatus(tx, projectId, userId);

		if (!membership) {
			throw new Error("You are not authorized to unlock this project.");
		}

		const updated = await tx.project.update({
			where: { id: projectId },
			data: { isLocked: false },
		});
		return updated;
	});
}

export async function getProjectApplications(id: string) {
	try {
		const project = await db.project.findUnique({
			where: { id },
			include: {
				applications: true,
			},
		});
		return project?.applications;
	} catch (e) {
		throw new Error("Failed to fetch project");
	}
}

export async function getApplicationStatus(projectId: string, userId: string) {
	try {
		const application = await db.projectApplication.findFirst({
			where: { projectId, userId },
		});
		return application?.status;
	} catch (e) {
		throw new Error("Failed to fetch project");
	}
}

export async function getRelevantProjects(userId: string) {
	return db.$transaction(async (tx) => {
		const user = await tx.user.findUnique({
			where: { id: userId },
			include: {
				skills: {
					select: {
						skillId: true,
					},
				},
			},
		});

		if (!user) {
			throw new Error(`User with ID ${userId} does not exist`);
		}

		const userSkillIds = user.skills.map((skill) => skill.skillId);

		if (userSkillIds.length === 0) {
			return [];
		}

		const projects = await tx.project.findMany({
			where: {
				ProjectMembership: {
					none: {
						userId,
					},
				},
				roles: {
					some: {
						name: { not: OWNER_ROLE_NAME },
						requiredSkills: {
							some: {
								skillId: { in: userSkillIds },
							},
						},
					},
				},
			},
			select: {
				id: true,
				name: true,
				description: true,
				githubLink: true,
				difficulty: true,
				isLocked: true,
				roles: {
					where: {
						name: { not: OWNER_ROLE_NAME },
						requiredSkills: {
							some: {
								skillId: { in: userSkillIds },
							},
						},
					},
					select: {
						id: true,
						name: true,
						outerColor: true,
						innerColor: true,
						requiredSkills: {
							where: {
								skillId: { in: userSkillIds },
							},
							select: {
								skill: {
									select: {
										id: true,
										name: true,
										outerColor: true,
										innerColor: true,
									},
								},
							},
						},
					},
				},
			},
		});

		return projects.map((project) => ({
			...project,
			roles: project.roles.map((role) => ({
				id: role.id,
				name: role.name,
				outerColor: role.outerColor,
				innerColor: role.innerColor,
				matchingSkills: role.requiredSkills.map((required) => required.skill),
			})),
		}));
	});
}

export async function getProjectOwner(projectId: string) {
	try {
		const owner = await db.projectMembership.findFirst({
			where: {
				projectId,
				role: { is: { name: OWNER_ROLE_NAME } },
			},
			include: { user: true },
		});
		if (!owner) {
			throw new Error("Project owner not found");
		}
		return owner.user;
	} catch (e) {
		throw new Error("Failed to fetch project owner");
	}
}

export async function getProjectMembers(projectId: string) {
	try {
		const members = await db.projectMembership.findMany({
			where: {
				projectId,
				role: { isNot: { name: OWNER_ROLE_NAME } },
			},
			include: { user: true, role: true },
		});

		return members.map((member) => ({
			...member.user,
			projectMembership: {
				id: member.id,
				projectId: member.projectId,
				dateJoined: member.dateJoined,
				role: member.role,
			},
		}));
	} catch (e) {
		throw new Error("Failed to fetch project members");
	}
}

export async function createProjectRole(
	projectId: string,
	roleData: ProjectRoleCreateData,
) {
	return db.$transaction(async (tx) => {
		const project = await tx.project.findUnique({
			where: { id: projectId },
		});
		if (!project) {
			throw new Error("Project not found");
		}

		if (roleData.name.trim().toLowerCase() === OWNER_ROLE_NAME) {
			throw new Error("Cannot create owner role.");
		}

		const role = await tx.role.create({
			data: {
				...buildRoleCreateData(roleData),
				project: { connect: { id: projectId } },
			},
		});

		return role;
	});
}
