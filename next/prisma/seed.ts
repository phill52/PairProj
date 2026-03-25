import { PrismaClient } from "../app/generated/prisma/client";
import { getUser } from "@/lib/users";
import { createProject, getProject, updateProject } from "@/lib/projects";
import db from "@/lib/prisma";

const prisma = new PrismaClient();

async function main() {
	await prisma.projectMembership.deleteMany();
	await prisma.project.deleteMany();
	await prisma.skill.deleteMany();

	const project1 = await createProject("cmmbguupm0002gmtwf3z9zyln", {
		name: "PairProj",
		githubLink: "https://https://github.com/phill52/PairProj",
		difficulty: "Intermediate",
		description: "Test description",
		skills: [],
		areas: [],
	});

	console.log({ project1 });

	const updated1 = await updateProject(
		"cmmbguupm0002gmtwf3z9zyln",
		project1.id,
		"PairProjTwo",
		"https://https://github.com/phill52/PairProj",
		"easy",
		"Testing project update",
		[],
		[],
	);
}

main()
	.then(async () => {
		await prisma.$disconnect();
		try {
			await db.$disconnect();
		} catch (e) {}
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		try {
			await db.$disconnect();
		} catch (e) {}
		process.exit(1);
	});
