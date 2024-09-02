"use server";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/db/auth";
import { db, project } from "@/db/schema";
import { z } from "zod";
const projectSchema = z.object({
	name: z.string().min(3),
	description: z.string().min(3),
});

export async function POST(req: NextRequest) {
	const session = await auth();
	if (!session) {
		return NextResponse.json({ error: "Not authorized" }, { status: 401 });
	}
	const userId = session.user.id;

	const body = await req.json();
	const validatedData = projectSchema.parse(body);

	if (!validatedData) {
		return NextResponse.json({ error: "Invalid data" }, { status: 400 });
	}

	const { name, description } = validatedData;

	const inserted_project = await db
		.insert(project)
		.values({
			name: name,
			description: description,
			owner_profile_id: userId,
		})
		.returning();
}
