import db from "@/lib/prisma";

export async function getUser(id: string) {
	
	try {

		const profile = await db.user.findUnique({
			where: { id },
			include: { 
				skills: true,
				areaOfInterest: true,
				projectContributions: true, 
				experience: true,
				sessions:true
			}
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
