"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createProfile as createProfileInLibrary } from "@/lib/users";
import type { SubmitProfile } from "@/types/profile-items";

export async function createProfile(profile: SubmitProfile) {
	return createProfileInLibrary(profile);
}

export async function addSkill(userId: string, formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authorized to add skill.");
  }

  if (session.user.id !== userId) {
    throw new Error("Not authorized to add another user's skill.");
  }

  try {
    const skillName = formData.get("skill") as string;
    const skillLevel = formData.get("skillLevel") as string;

    let skill = await db.skill.findFirst({
      where: { name: skillName },
    });

    if (!skill) {
      skill = await db.skill.create({
        data: {
          name: skillName,
          outerColor: "#000",
          innerColor: "#fff",
        },
      });
    }

    const newSk = await db.skillsOnUsers.create({
      data: {
        userId,
        skillId: skill.id,
        skillLevel,
      },
      include: {
        skill: true,
      },
    });

    revalidatePath(`/profile/${userId}`);
    return newSk;
  } catch (error) {
    throw new Error(error);
  }
}


export async function addExperience(userId: string, formData: FormData) {
    const session = await auth();
  
    if (!session?.user?.id) {
      throw new Error("Not authorized to add experience.");
    }
  
    if (session.user.id !== userId) {
      throw new Error("Cannot add experience to another user's profile.");
    }
  
    try {

      const employer = formData.get("employer") as string;
      const position = formData.get("position") as string;
      const description = formData.get("description") as string;
      const startDate = formData.get("startDate") as string;
      const endDate = formData.get("endDate") as string;
  
      const newExp = await db.experience.create({
        data: {
          userId,
          employer,
          position,
          description,
          startDate: new Date(startDate),
          endDate: endDate ? new Date(endDate) : null, 
        },
      });
  
      revalidatePath(`/profile/${userId}`);
      return newExp;
    } catch (error) {
        console.log(error)
        throw new Error("Failed to add experience");
    }
  }

export async function addEducation(userId: string, formData: FormData) {
    const session = await auth();
  
    if (!session?.user?.id) {
      throw new Error("Not authorized to add education.");
    }
  
    if (session.user.id !== userId) {
      throw new Error("Not authorized to add another user's education.");
    }
  
    try {
      const school = formData.get("school") as string;
      const level = formData.get("level") as string;
      const startDate = formData.get("startDate") as string;
      const endDate = formData.get("endDate") as string;
      const description = formData.get("description") as string;
  
      const newEd = await db.education.create({
        data: {
          userId,
          school,
          level,
          description,
          startDate: new Date(startDate),
          endDate: endDate ? new Date(endDate) : null, 
        },
      });
  
      revalidatePath(`/profile/${userId}`);
  
      return newEd;
    } catch (error) {

      throw new Error(error);
    }
  }