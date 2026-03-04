import db from "@/lib/prisma";

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
			console.log("Project not found!");
			return null;
		}
		return project;
	} catch (e) {
		console.error("Database Error:", e);
		throw "Failed to fetch project";
	}
}

export async function createProject(
	userId: string,
	name: string,
	githubLink: string,
	difficulty: string,
	description: string,
	skills: string[],
	areasOfInterest: string[],
) {
	return db.project.create({
		data: {
			name: name,
			githubLink: githubLink,
			difficulty: difficulty,
			description: description,

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
		},
	});
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
	const membership = await db.projectMembership.findFirst({
		where: { projectId, userId, role: "owner" },
	});

	if (!membership) {
		throw new Error("You are not authorized to update this project.");
	}

	try {
		const updated = await db.project.update({
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
	} catch (e) {
		console.error("Database Error:", e);
		throw "Failed to update project";
	}
}

export async function deleteProject(userId: string, projectId: string) {
	const membership = await db.projectMembership.findFirst({
		where: { projectId, userId, role: "owner" },
	});

	if (!membership) {
		throw new Error("You are not authorized to delete this project.");
	}

	try {
		await db.projectMembership.deleteMany({ where: { projectId } });
		await db.projectApplication.deleteMany({ where: { projectId } });

		const deleted = await db.project.delete({
			where: { id: projectId },
		});

		return deleted;
	} catch (e) {
		console.error("Database Error:", e);
		throw "Failed to delete project";
	}
}

export async function applyToProject(userId: string, projectId: string) {
	const membership = await db.projectMembership.findFirst({
		where: { projectId, userId },
	});
	if (membership) {
		throw new Error("You are already a member of this project.");
	}

	const existing = await db.projectApplication.findFirst({
		where: { projectId, userId },
	});
	if (existing) {
		throw new Error("You have already applied to this project.");
	}

	try {
		const application = await db.projectApplication.create({
			data: {
				project: { connect: { id: projectId } },
				user: { connect: { id: userId } },
			},
		});
		return application;
	} catch (e) {
		console.error("Database Error:", e);
		throw "Failed to create application";
	}
}

export async function lockProject(userId: string, projectId: string) {
	const membership = await db.projectMembership.findFirst({
		where: { projectId, userId, role: "owner" },
	});

	if (!membership) {
		throw new Error("You are not authorized to delete this project.");
	}

	try {
		const updated = await db.project.update({
			where: { id: projectId },
			data: { isLocked: true },
		});
		return updated;
	} catch (e) {
		console.error("Database Error:", e);
		throw "Failed to lock project";
	}
}

export async function unlockProject(userId: string, projectId: string) {
	const membership = await db.projectMembership.findFirst({
		where: { projectId, userId, role: "owner" },
	});

	if (!membership) {
		throw new Error("You are not authorized to delete this project.");
	}

	try {
		const updated = await db.project.update({
			where: { id: projectId },
			data: { isLocked: false },
		});
		return updated;
	} catch (e) {
		console.error("Database Error:", e);
		throw "Failed to unlock project";
	}
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
		console.error("Database Error:", e);
		throw "Failed to fetch project";
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
		console.error("Database Error:", e);
		throw "Failed to fetch project";
	}
}

export async function getApplicationStatus(projectId: string, userId: string) {
	try {
		const application = await db.projectApplication.findFirst({
			where: { projectId, userId },
		});
		return application?.status;
	} catch (e) {
		console.error("Database Error:", e);
		throw "Failed to fetch project";
	}
}

export async function checkMatchingSkills(projectId: string, userId: string) {
	try {
		const project = await db.project.findUnique({
			where: { id: projectId },
			include: { skills: true },
		});

		const user = await db.user.findUnique({
			where: { id: userId },
			include: { skills: { include: { skill: true } } },
		});

		if (!project || !user) {
			throw `User or Project does not exist`;
		}

		const projectSkillIds = new Set(project.skills.map((s) => s.id));
		const matchingSkills = user.skills.filter((s) =>
			projectSkillIds.has(s.skill.id),
		);

		return matchingSkills.map((s) => s.skill.name);
	} catch (e) {
		console.error("Database Error:", e);
		throw "Failed to check matching skills";
	}
}
