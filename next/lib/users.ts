import db from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import {
	SubmitProfile
} from "@/types/profile-items"

import { SubmitProfileZSchema } from "@/utils/validation/user";

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
						message: err.message,
					})),
				),
			);
		}
		console.error("Unexpected error during validation:", error);
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
			experience,
		} = validatedProfile;

		const newProfile = await db.user.create({
			data: {
				id: session.user.id, 
				name,
				email,
				image,
				areasOfInterest: {
					connect: areasOfInterest.map((id) => ({ id })),
				},
				skills: {
					create: skills.map((skl) => ({
						skillId: skl.skillId,
						skillLevel: skl.skillLevel,
					})),
				},
				education: {
					create: education.map((edu) => ({
						school: edu.school,
						level: edu.level,
						date: edu.date,
						description: edu.description,
					})),
				},
				experience: {
					create: experience.map((xp) => ({
						employer: xp.employer,
						position: xp.position,
						date: xp.date,
						description: xp.description,
					})),
				},
			},
		});
		return newProfile;
	} catch (e) {
		throw new Error(`Failed to create profile: (${e})`);
	}
}

export async function canEditorViewProfile(profileId: string){

	const session = await auth();
	if (!session){
		throw new Error("Unauthorized");
	}

	return session.user.id === profileId;

}

