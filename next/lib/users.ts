import db from "@/lib/prisma";

export async function getUser(id: string) {
	try {
		if (!id) {
			throw "Profile ID is required";
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
			console.log("Profile not found");
			return null;
		}

		return profile;
	} catch (e) {
		console.error("Database Error:", e);
		throw "Failed to fetch profile";
	}
}

export async function getAllUsers() {
	try {
		const users = await db.user.findMany({
			include: {
				skills: true,
				areasOfInterest: true,
				projectContributions: true,
				experience: true,
				sessions: true,
			},
		});

		return users;
	} catch (e) {
		console.error("Database Error:", e);
		throw "Failed to fetch profiles";
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
		console.error("Database Error:", e);
		throw "Failed to create skill";
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
		console.error("Database Error:", e);
		throw "Failed to create area of interest";
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
		console.error("Database Error:", e);
		throw "Failed to create education";
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
		console.error("Database Error:", e);
		throw "Failed to create experience";
	}
}

export async function canEditOrViewProfile(
	viewerId: string,
	profileId: string
) {
	if (!viewerId || !profileId) return false;

	if (viewerId === profileId) return true;

	return false;
}

export async function updateProfile(
	profileId: string,
	name?: string,
	email?: string,
	image?: string
) {

	try {

		if (!profileId) {
			throw "Profile ID is required to update profile.";
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

		throw "Failed to update profile";

	}
}

export async function deleteProfile(profileId: string) {
	
	try {
		if (!profileId) {
			throw "Profile ID is required";
		}

		const deleted = await db.user.delete({
			where: { id: profileId },
		});

		return deleted;

	} catch (e) {
		throw "Failed to delete profile";
	}
}

