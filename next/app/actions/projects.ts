"use server";
import { auth } from "@/lib/auth";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { SubmitProject } from "@/types/projects";
import { createProject as createProjectLib } from "@/lib/projects";


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
		const application = await tx.projectApplication.create({
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