import db from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getProject(id: string) {
	try {
		const project = await db.project.findUnique({
			where: { id },
			include: {
				areasOfInterest: true,
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

export async function createProject(
	name: string,
	githubLink: string,
	difficulty: string,
	skills: string[],
	areasOfInterest: string[],
) {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		throw new Error("You must be logged in to create a project.");
	}

	const userId = session.user.id;

	return db.project.create({
		data: {
			name: name,
			githubLink: githubLink,
			difficulty: difficulty,

			skills: {
				connect: skills.map((id) => ({ id })),
			},
			areasOfInterest: {
				connect: areasOfInterest.map((id) => ({ id })),
			},
			ProjectMembership: {
				create: {
					userId: userId,
					dateJoined: new Date().toISOString(),
					role: "owner"
				},
			},
		},
	});
}
