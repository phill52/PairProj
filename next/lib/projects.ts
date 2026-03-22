import db from "@/lib/prisma";
import { getMembershipStatus } from "./utils";
import { SubmitProject } from "@/types/project";
import { SubmitProjectSchema } from "@/schemas/project";
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
			},
		});
		if (!project) {
			throw new Error("Project Not Found");
		}
		return project;
	} catch (e) {
		throw new Error("Failed to fetch project");
	}
}

export async function createProject(
  userId: string,
  projectData: SubmitProject
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
						message: err.message
					})),
				),
			);
		}
		throw new Error("An unexpected error occurred during validation");
	}
	try {
    	const { name, description, githubLink, difficulty, skills, areasOfInterest } = validatedProject;

    	return await db.project.create({
      		data: {
				name: name,
				githubLink: githubLink,
				difficulty: difficulty,
				skills: {
					connect: skills.map((id) => ({ id })),
				},
				areasOfInterest: {
					connect: areasOfInterest.map((id) => ({ id })),
				},
				ProjectMembership: {
					create: {
						userId: userId,
						dateJoined: new Date().toISOString(),
						role: "owner",
					},
				},
      		}
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
			},
			include: {
				areasOfInterest: true,
				skills: true,
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

export async function getProjectMembers(id: string) {
	try {
		const project = await db.project.findUnique({
			where: { id },
			include: {
				ProjectMembership: true,
			},
		});
		return project?.ProjectMembership;
	} catch (e) {
		throw new Error("Failed to fetch project");
	}
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
