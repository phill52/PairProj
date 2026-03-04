import { PrismaClient } from "../app/generated/prisma/client";
import { getAllUsers, getUser } from "@/lib/users";
import { createProject, getProject, updateProject } from "@/lib/projects";
import db from "@/lib/prisma";

const prisma = new PrismaClient();

async function main() {
	await prisma.projectMembership.deleteMany();
	await prisma.project.deleteMany();
	await prisma.skill.deleteMany();

	const users = await getAllUsers();
	const userId = users[0].id;
	console.log(await getUser(userId));

	const project1 = await createProject(
		userId,
		"PairProj",
		"https://https://github.com/phill52/PairProj",
		"Intermediate",
		"Test description",
		[],
		[],
	);

	console.log({ project1 });

	const updated1 = await updateProject(
		userId,
		project1.id,
		"PairProjUpdated",
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
		} catch (e) {
			//do nothing
		}
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		try {
			await db.$disconnect();
		} catch (e) {
			//do nothing
		}
		process.exit(1);
	});
