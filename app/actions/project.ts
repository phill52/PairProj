"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/db/auth";
import { db, project } from "@/db/schema";
import { z } from "zod";

export const projectSchema = z.object({
	name: z.string().min(3),
	description: z.string().min(3),
});

export async function createProject(name: string, description: string) {
	//TODO: add more fields to the parameters for the stuff in the project table, I just did this as a mockup
	const session = await auth();
	if (!session) {
		return { error: "Not authorized" };
	}
	const userId = session.user.id;

	const validatedData = projectSchema.parse({ name, description });

	if (!validatedData) {
		return { error: "Invalid data" };
	}

	const insertedProject = await db.insert(project).values({
		name: validatedData.name,
		description: validatedData.description,
		owner_profile_id: userId,
	});

	await revalidatePath("/api/projects");
}

export async function getProjects() {
	const projects = await db.select().from(project).limit(20);
	return projects;
}

export async function getProject(id: string) {
	const foundProject = await db
		.select()
		.from(project)
		.where(eq(project.id, id))
		.limit(1);
	return foundProject;
}
