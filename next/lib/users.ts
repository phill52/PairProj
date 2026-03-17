import db from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getUser(id: string) {
	try {
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

export async function createSkill(
	name: string,
	outerColor: string,
	innerColor: string,
) {
	try {
		const created = await db.skill.create({
			data: { name, outerColor, innerColor },
		});
		return created;
	} catch (e) {
		throw new Error("Failed to create skill");
	}
}

export async function createAreaOfInterest(
	name: string,
	outerColor: string,
	innerColor: string,
) {
	try {
		const created = await db.areaOfInterest.create({
			data: { name, outerColor, innerColor },
		});
		return created;
	} catch (e) {
		throw new Error("Failed to create area of interest");
	}
}

export async function createEducation(
	userId: string,
	school: string,
	level: string,
	date: string,
	description: string,
) {
	try {
		const created = await db.education.create({
			data: { userId, school, level, date, description },
		});

		return created;
	} catch (e) {
		throw new Error("Failed to create education");
	}
}

export async function createExperience(
	userId: string,
	employer: string,
	position: string,
	date: string,
	description: string,
) {
	try {
		const created = await db.experience.create({
			data: { userId, employer, position, date, description },
		});
		return created;
	} catch (e) {
		throw new Error("Failed to create experience");
	}
}

export async function canEditOrViewProfile(
	profileId: string,
) {
	const session = await auth();
	if (!session) return false; 
	return session.user.id === profileId;
}

export async function updateProfile(
	profileId: string,
	name?: string,
	email?: string,
	image?: string,
) {
	try {
		if (!profileId) {
			throw new Error("Profile ID is required to update profile.");
		}
		const updated = await db.user.update({
			where: { id: profileId },
			data: {
				...(name !== undefined && { name }),
				...(email !== undefined && { email }),
				...(image !== undefined && { image }),
			},
		});
		return updated;
	} catch (e) {
		throw new Error("Failed to update profile");
	}
}

export async function deleteProfile(profileId: string) {
	if (!profileId) {
		throw new Error("Profile ID is required");
	}
	return db.$transaction(async (tx) => {
		await tx.skillsOnUsers.deleteMany({
			where: { userId: profileId },
		});
		await tx.projectMembership.deleteMany({
			where: { userId: profileId },
		});
		await tx.projectApplication.deleteMany({
			where: { userId: profileId },
		});
		await tx.account.deleteMany({
			where: { userId: profileId },
		});
		await tx.session.deleteMany({
			where: { userId: profileId },
		});
		await tx.education.deleteMany({
			where: { userId: profileId },
		});
		await tx.experience.deleteMany({
			where: { userId: profileId },
		});
		const deleted = await tx.user.delete({
			where: { id: profileId },
		});
		return deleted;
	});
}
