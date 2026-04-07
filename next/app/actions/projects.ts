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
