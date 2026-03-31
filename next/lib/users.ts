import db from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import {
	SubmitProfile
} from "@/types/profile-items"

import { SubmitProfileZSchema } from "@/utils/validation/user";

//TODO: zod validation for experience and education forms
export interface NewExperienceInput {
	employer: string;
	position: string;
	date: string;
	description: string;
}
export interface NewEducationInput {
	school: string;
	level: string;
	date: string;
	description: string;
}

export async function getUser(id: string) {
	
	try {
		const session = await auth();
		if (!session) {
			throw new Error("Profile ID is required");
		}
		if (!id) {
			throw new Error("Profile ID is required");
		}
		const profile = await db.user.findUnique({
			where: { id },
			include: {
				skills: true,
				areasOfInterest: true,
				projectContributions: true,
				experience: true,
				sessions: true, 
				education: true,
			},
		});
		if (!profile) {
			throw new Error("Profile Not Found");
		}
		return profile;
	} catch (e) {
		throw new Error("Failed to fetch profile");
	}
}
  
export async function createProfile(profile: SubmitProfile) {
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
	try {
		const session = await auth();
		if (!session.user.id) {
			throw new Error("Not authorized to create profile.");
		}

		const {
			name,
			email,
			image,
			areasOfInterest,
			skills,
			education,
			experience
		} = validatedProfile;

		const newProfile = await db.user.create({
			data: {
				name,
				email,
				image,
				areasOfInterest: {
					connect: areasOfInterest.map((id) => ({ id }))
				},
				skills: {
					create: skills.map((skl) => ({
					  skill: { connect: { id: skl.skillId } },
					  skillLevel: skl.skillLevel,
					})),
				},
				education: {
					create: education.map((edu) => ({
						school: edu.school,
						level: edu.level,
						date: edu.date,
						description: edu.description
					})),
				},
				experience: {
					create: experience.map((xp) => ({
						employer: xp.employer,
						position: xp.position,
						date: xp.date,
						description: xp.description
					})),
				},
			},
		});
		return newProfile;
	} catch (e) {
		throw new Error(`Failed to create profile: (${e})`);
	}
}

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
			  date: edu.date,
			  description: edu.description
			})),
		  },
		  experience: {
			deleteMany: {}, 
			create: experience.map((xp) => ({
			  employer: xp.employer,
			  position: xp.position,
			  date: xp.date,
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
  
	  return updatedProfile;
	} catch (e) {
	  throw new Error(`Failed to update profile: (${e})`);
	}
}

export async function deleteProfile() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authorized to delete profile.");
  }

  const userId = session.user.id;

  try {
    await db.$transaction(async (tx) => {
      await tx.skillsOnUsers.deleteMany({ where: { userId } });
      await tx.education.deleteMany({ where: { userId } });
      await tx.experience.deleteMany({ where: { userId } });
      await tx.projectMembership.deleteMany({ where: { userId } });
      await tx.projectApplication.deleteMany({ where: { userId } });
      await tx.session.deleteMany({ where: { userId } });
      await tx.account.deleteMany({ where: { userId } });
      await tx.user.delete({ where: { id: userId } });
    });

    return { success: "Profile deleted successfully." };
  } catch (error) {
    throw new Error("Failed to delete profile.");
  }
}

export async function getViewProfileProps(
	userId: string,
): Promise<ViewProfileProps | null> {
	try {
		const userData = await db.user.findUnique({
			where: { id: userId },
			include: {
				skills: {
					include: {
						skill: true,
					},
				},
				areasOfInterest: true,
				education: true,
				experience: true,
				projectContributions: {
					include: {
						project: {
							include: {
								skills: true,
							},
						},
					},
				},
			},
		});

		if (!userData) return null;

		const userSkills: Skill[] = userData.skills.map((s) => ({
			name: s.skill.name,
			innerColor: s.skill.innerColor,
			outerColor: s.skill.outerColor,
			level: s.skillLevel,
		}));

		const education = userData.education.map((e) => ({
			school: e.school,
			level: e.level,
			date: e.date,
			description: e.description,
		}));

		const experience = userData.experience.map((e) => ({
			employer: e.employer,
			position: e.position,
			date: e.date,
			description: e.description,
		}));

		const projCon = userData.projectContributions.map((pc) => ({
			id: pc.project.id,
			name: pc.project.name,
			description: pc.project.description,
			skills: pc.project.skills.map((s) => ({
				name: s.name,
				innerColor: s.innerColor,
				outerColor: s.outerColor,
			})),
		}));

		return {
			name: userData.name,
			email: userData.email,
			image: userData.image,
			all_skills: userSkills,
			areas: userData.areasOfInterest,
			education,
			experience,
			projectContributions: projCon,
		};
	} catch (error) {
		return null;
	}
}

export async function canEditorViewProfile(profileId: string){

	const session = await auth();
	if (!session){
		throw new Error("Unauthorized");
	}

	return session.user.id === profileId;

}

export async function addExperience(userId: string, data: NewExperienceInput) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authorized to add experience.");
  }

  if (session.user.id !== userId) {
    throw new Error("Cannot add experience to another user's profile.");
  }

  try {
    const newExp = await db.experience.create({
      data: {
        userId,
        employer: data.employer,
        position: data.position,
        date: data.date,
        description: data.description,
      },
    });

    return newExp;
  } catch (error) {
    throw new Error("Failed to add experience.");
  }
}

export async function addEducation(userId: string, data: NewEducationInput) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Not authorized to add education.");
	}

	if (session.user.id !== userId) {
		throw new Error("Not authorized to add another users education.");
	}

	try {
		const newEd = await db.education.create({
			data: {
				userId,
				school: data.school,
				level: data.level,
				date: data.date,
				description: data.description,
			},
		});
		return newEd;
	} catch (error) {
		throw new Error("Failed to add education.");
	}
}
