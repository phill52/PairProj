"use server";
import { auth } from "@/lib/auth";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function applyToProject(
	projectId: string,
	roleId: string,
	body: string,
) {
	const session = await auth();
	if (!session) {
		throw new Error("Not authenticated");
	}
	const userId = session.user.id;
	return db.$transaction(async (tx) => {
		const membership = await tx.projectMembership.findFirst({
			where: { projectId, userId },
		});
		if (membership) {
			return {
				success: false,
				message: "You are already a member of this project.",
			};
		}
		const existing = await tx.projectApplication.findFirst({
			where: { projectId, userId, roleId },
		});
		if (existing) {
			return {
				success: false,
				message: "You have already applied to this role.",
			};
		}
		await tx.projectApplication.create({
			data: {
				project: { connect: { id: projectId } },
				user: { connect: { id: userId } },
				role: { connect: { id: roleId } },
				body,
			},
		});
		revalidatePath(`/projects/${projectId}`);
		return { success: true };
	});
}

async function isProjectOwner(tx: any, projectId: string, userId: string) {
	return tx.projectMembership.findFirst({
		where: {
			projectId,
			userId,
			role: { is: { name: "owner" } },
		},
	});
}

export async function acceptProjectApplicant(applicationId: string) {
	const session = await auth();
	if (!session) {
		throw new Error("Not authenticated");
	}

	const ownerUserId = session.user.id;

	return db.$transaction(async (tx) => {
		const application = await tx.projectApplication.findUnique({
			where: { id: applicationId },
		});

		if (!application) {
			return { success: false, message: "Application not found." };
		}

		const ownerMembership = await isProjectOwner(
			tx,
			application.projectId,
			ownerUserId,
		);

		if (!ownerMembership) {
			return {
				success: false,
				message: "You are not authorized to review applicants.",
			};
		}

		if (application.status === "accepted") {
			return {
				success: false,
				message: "This application has already been accepted.",
			};
		}

		if (application.status === "denied") {
			return {
				success: false,
				message: "This application has already been denied.",
			};
		}

		const existingMembership = await tx.projectMembership.findFirst({
			where: {
				projectId: application.projectId,
				userId: application.userId,
			},
		});

		if (existingMembership) {
			return {
				success: false,
				message: "This user is already a member of the project.",
			};
		}

		await tx.projectMembership.create({
			data: {
				projectId: application.projectId,
				userId: application.userId,
				roleId: application.roleId,
				dateJoined: new Date().toISOString(),
			},
		});

		await tx.projectApplication.update({
			where: { id: application.id },
			data: { status: "accepted" },
		});

		revalidatePath(`/projects/${application.projectId}`);
		return { success: true };
	});
}

export async function denyProjectApplicant(applicationId: string) {
	const session = await auth();
	if (!session) {
		throw new Error("Not authenticated");
	}

	const ownerUserId = session.user.id;

	return db.$transaction(async (tx) => {
		const application = await tx.projectApplication.findUnique({
			where: { id: applicationId },
		});

		if (!application) {
			return { success: false, message: "Application not found." };
		}

		const ownerMembership = await isProjectOwner(
			tx,
			application.projectId,
			ownerUserId,
		);

		if (!ownerMembership) {
			return {
				success: false,
				message: "You are not authorized to review applicants.",
			};
		}

		if (application.status === "accepted") {
			return {
				success: false,
				message: "Accepted applications cannot be denied.",
			};
		}

		if (application.status === "denied") {
			return {
				success: false,
				message: "This application has already been denied.",
			};
		}

		await tx.projectApplication.update({
			where: { id: application.id },
			data: { status: "denied" },
		});

		revalidatePath(`/projects/${application.projectId}`);
		return { success: true };
	});
}

export async function getProjects({
	skills,
	difficulty,
	query,
	status,
	team,
}: {
	skills?: string[];
	difficulty?: string;
	query?: string;
	status?: string;
	team?: string;
}) {
	const where: any = {};

	if (difficulty) {
		where.difficulty = difficulty;
	}

	if (query) {
		where.name = {
			contains: query,
		};
	}

	if (skills && skills.length > 0) {
		where.skills = {
			some: {
				name: {
					in: skills,
				},
			},
		};
	}

	if (status === "open") {
	where.isLocked = false;
	}

	if (status === "closed") {
	where.isLocked = true;
	}

	let projects = await db.project.findMany({
		where,
		include: {
			skills: true,
			areasOfInterest: true,
			ProjectMembership: true,
			applications: true,
		},
	});

	if (team) {
		projects = projects.filter((p) => {
			const size = p.ProjectMembership.length;

			if (team === "small") return size <= 3;
			if (team === "medium") return size <= 10;
			if (team === "large") return size > 10;

			return true;
		});
	}

	return projects;
}
