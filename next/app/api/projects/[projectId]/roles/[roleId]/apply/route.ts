"use server";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { applyToProject } from "@/lib/projects";

export async function POST(
	req: NextRequest,
	{ params }: { params: { projectId: string; roleId: string } },
) {
    console.log("IN")
    const { projectId, roleId } = params;
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
    const requestBody = await req.json();
	const { body } = requestBody;
    try{
        const application = await applyToProject(session.user.id, projectId, roleId, body);
        return NextResponse.json(application, { status: 201 });
    }catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }



}
