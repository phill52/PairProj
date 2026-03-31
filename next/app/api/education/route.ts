import { NextResponse } from "next/server";
import { addEducation } from "@/lib/users";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, ...data } = body;

    const newExp = await addEducation(userId, data);

    return NextResponse.json(newExp);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
