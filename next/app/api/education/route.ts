import { NextResponse } from "next/server";
import { addEducation } from "@/lib/users";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, startDate, endDate, ...data } = body;

    const newEd = await addEducation(userId, {
      ...data,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    return NextResponse.json(newEd);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
