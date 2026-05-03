"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
	SubmitProfile
} from "@/types/profile-items"
import { SubmitProfileZSchema } from "@/utils/validation/user";


export async function updateProfile(profile: SubmitProfile) {
	let validatedProfile: z.infer<typeof SubmitProfileZSchema>;
	try {
	  validatedProfile = SubmitProfileZSchema.parse(profile);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error(
				JSON.stringify(
					error.errors.map((err) => ({
						path: err.path.join("."),
						message: err.message
					})),
				),
			);
		}
		throw new Error("An unexpected error occurred during validation");
	}
  
	const session = await auth();
	if (!session?.user?.id) {
	  throw new Error("Not authorized to update profile.");
	}
  
	const { name, email, image, areasOfInterest, skills, education, experience } =
	  validatedProfile;
  
	try {
	  const updatedProfile = await db.user.update({
		where: { id: session.user.id },
		data: {
		  name,
		  email,
		  image,
		  areasOfInterest: {
			set: areasOfInterest.map((id) => ({ id }))
		  },
		  skills: {
			deleteMany: {}, 
			create: skills.map((skl) => ({
			  skillId: skl.skillId,
			  skillLevel: skl.skillLevel
			})),
		  },
		  education: {
			deleteMany: {}, 
			create: education.map((edu) => ({
			  school: edu.school,
				level: edu.level,
				startDate: new Date(edu.startDate),
        endDate: edu.endDate ? new Date(edu.endDate) : null,
				description: edu.description
			})),
		  },
		  experience: {
			deleteMany: {}, 
			create: experience.map((xp) => ({
				employer: xp.employer,
				position: xp.position,
				startDate: new Date(xp.startDate),
        endDate: xp.endDate ? new Date(xp.endDate) : null,
				description: xp.description
			})),
		  },
		},
		include: {
			areasOfInterest: true,
			skills: true,
			education: true,
			experience: true
		},
	  });

    revalidatePath(`/profile/${session.user.id}/edit`);
  
	  return updatedProfile;
	} catch (e) {

	  throw new Error(`Failed to update profile: (${e})`);

	}
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