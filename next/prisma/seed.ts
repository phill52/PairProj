import { PrismaClient } from "../app/generated/prisma/client";
import { getUser } from "@/lib/users";

const prisma = new PrismaClient();

async function main() {
	await prisma.projectMembership.deleteMany();
	await prisma.project.deleteMany();
    await prisma.skill.deleteMany();


	const userId = "cmlyjzzd50000gmjwsc8fy1ve";
	console.log("AAA");
	console.log(await getUser(userId));
	console.log("AAA");

	const project = await prisma.project.create({
		data: {
			name: "PairProj",
			githubLink:
				"https://https://github.com/phill52/PairProj",
			difficulty: "Intermediate",
			skills: {
				connectOrCreate: [
					{
						where: { id: "skill-ts" },
						create: {
							id: "skill-ts",
							name: "TypeScript",
							outerColor: "#3178c6",
							innerColor: "#ffffff",
						},
					},
				],
			},
			areasOfInterest: {
				connectOrCreate: [
					{
						where: { id: "area-web" },
						create: {
							id: "area-web",
							name: "Web Development",
							outerColor: "#000",
							innerColor: "#fff",
						},
					},
				],
			},
			ProjectMembership: {
				create: {
					userId: userId,
					role: "owner",
					dateJoined: new Date().toISOString(),
				},
			},
		},
	});

	console.log({ project });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
