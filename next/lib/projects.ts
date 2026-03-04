import db from "@/lib/prisma";

export async function getProject(id: string) {
	try {
		const project = await db.project.findUnique({
			where: { id },
			include: {
				areasOfInterest: true,
				skills: true,
				githubIssues: true,
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
