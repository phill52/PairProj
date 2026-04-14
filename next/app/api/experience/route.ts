import { NextResponse } from "next/server";
import { addExperience } from "@/lib/users";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, ...data } = body;

    const newExp = await addExperience(userId, data);

    return NextResponse.json(newExp);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
