import db from "@/lib/prisma";
import { getMembershipStatus } from "./utils";
import { SubmitProject, ProjectRoleCreateData } from "@/types/projects";
import { SubmitProjectSchema } from "@/utils/validation/projects.ts";
import { z } from "zod";

export async function getProject(id: string) {
	try {
		const project = await db.project.findUnique({
			where: { id },
			include: {
				areasOfInterest: true,
				skills: true,
				githubIssues: true,
				ProjectMembership: true,
				applications: true,
				roles: {
					include: {
						requiredSkills: true,
						optionalSkills: true,
					},
				},
			},
		});
		if (!project) {
			throw new Error("Project Not Found");
		}
		return project;
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

		return await db.project.create({
			data: {
				name: name,
				description: description,
				githubLink: githubLink,
				difficulty: difficulty,
				skills: {
					connect: skills.map((id) => ({ id })),
				},
				areasOfInterest: {
					connect: areasOfInterest.map((id) => ({ id })),
				},
				roles: {
					create: (roles ?? []).map((role) => ({
						name: role.name,
						outerColor: role.outerColor,
						innerColor: role.innerColor,
						requiredSkills: role.requiredSkillIds
							? {
									connect: role.requiredSkillIds.map(
										(id) => ({ id }),
									),
								}
							: undefined,
						optionalSkills: role.optionalSkillIds
							? {
									connect: role.optionalSkillIds.map(
										(id) => ({ id }),
									),
								}
							: undefined,
					})),
				},
				ProjectMembership: {
					create: {
						userId: userId,
						dateJoined: new Date().toISOString(),
						role: "owner",
					},
				},
			},
		});
	} catch (e) {
		throw new Error("Failed to create project");
	}
}

export async function updateProject(
	userId: string,
	projectId: string,
	name: string,
	githubLink: string,
	difficulty: string,
	description: string,
	skills: string[],
	areasOfInterest: string[],
	roles: ProjectRoleCreateData[] = [],
) {
	return db.$transaction(async (tx) => {
		const membership = await getMembershipStatus(tx, projectId, userId);

		if (!membership) {
			throw new Error("You are not authorized to update this project.");
		}

		const updated = await tx.project.update({
			where: { id: projectId },
			data: {
				name,
				githubLink,
				difficulty,
				description,
				skills: {
					set: skills.map((id) => ({ id })),
				},
				areasOfInterest: {
					set: areasOfInterest.map((id) => ({ id })),
				},
				roles: {
					deleteMany: {},
					create: roles.map((role) => ({
						name: role.name,
						outerColor: role.outerColor,
						innerColor: role.innerColor,
						requiredSkills: role.requiredSkillIds
							? {
									connect: role.requiredSkillIds.map(
										(id) => ({ id }),
									),
								}
							: undefined,
						optionalSkills: role.optionalSkillIds
							? {
									connect: role.optionalSkillIds.map(
										(id) => ({ id }),
									),
								}
							: undefined,
					})),
				},
			},
			include: {
				areasOfInterest: true,
				skills: true,
				roles: true,
				githubIssues: true,
			},
		});
		return updated;
	});
}

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

export async function applyToProject(
	userId: string,
	projectId: string,
	body: string,
) {
	return db.$transaction(async (tx) => {
		const membership = await tx.projectMembership.findFirst({
			where: { projectId, userId },
		});
		if (membership) {
			throw new Error("You are already a member of this project.");
		}

		const existing = await tx.projectApplication.findFirst({
			where: { projectId, userId },
		});
		if (existing) {
			throw new Error("You have already applied to this project.");
		}

		const application = await tx.projectApplication.create({
			data: {
				project: { connect: { id: projectId } },
				user: { connect: { id: userId } },
				body,
			},
		});
		return application;
	});
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

export async function checkMatchingSkills(projectId: string, userId: string) {
	return db.$transaction(async (tx) => {
		const project = await tx.project.findUnique({
			where: { id: projectId },
			include: { skills: true },
		});

		const user = await tx.user.findUnique({
			where: { id: userId },
			include: { skills: { include: { skill: true } } },
		});

		if (!project) {
			throw new Error(`Project with ID ${projectId} does not exist`);
		}

		if (!user) {
			throw new Error(`User with ID ${userId} does not exist`);
		}

		const projectSkillIds = new Set(project.skills.map((s) => s.id));
		const matchingSkills = user.skills.filter((s) =>
			projectSkillIds.has(s.skill.id),
		);

		return matchingSkills.map((s) => s.skill.name);
	});
}

export async function getProjectOwner(projectId: string) {
	try {
		const owner = await db.projectMembership.findFirst({
			where: { projectId, role: "owner" },
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
			where: { projectId, role: { not: "owner" } },
			include: { user: true },
		});

		const users = members?.map((member) => member.user);
		return users;
	} catch (e) {
		throw new Error("Failed to fetch project owner");
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

		const role = await tx.role.create({
			data: {
				name: roleData.name,
				outerColor: roleData.outerColor,
				innerColor: roleData.innerColor,
				project: { connect: { id: projectId } },
				requiredSkills: roleData.requiredSkillIds
					? {
							connect: roleData.requiredSkillIds.map((id) => ({
								id,
							})),
						}
					: undefined,
				optionalSkills: roleData.optionalSkillIds
					? {
							connect: roleData.optionalSkillIds.map((id) => ({
								id,
							})),
						}
					: undefined,
			},
		});

		return role;
	});
}
