import { NextResponse } from "next/server";
import { addSkill } from "@/lib/users";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, ...data } = body;

    const newSkl = await addSkill(userId, data);

    return NextResponse.json(newSkl);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
