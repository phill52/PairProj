import db from "@/lib/prisma";

export async function getProject(id: string) {
	try {
		const project = await db.project.findUnique({
			where: { id },
			include: {
				areaOfInterest: true,
				skills: true,
				githubIssues: true,
			},
		});
		if (!project) {
			console.log("Project not found!");
			return null;
		}
		return project;
	} catch (e) {
		console.error("Database Error:", e);
		throw "Failed to fetch project";
	}
}
