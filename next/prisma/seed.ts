import { PrismaClient } from "../app/generated/prisma/client";
import { getUser } from "@/lib/users";
import { createProject, getProject, updateProject } from "@/lib/projects";
import db from "@/lib/prisma";

const prisma = new PrismaClient();

async function main() {
	// PASTE YOUR ID HERE AS THE FIRST PARAMETER
	// const userId = "cmn6gp65i0000gmjs2yrtu2mb";


	// test users
	const users = await Promise.all([
		prisma.user.create({
			data: {
				name: "Justin",
				email: "justin@example.com",
				image: "https://wallpapers.com/images/hd/placeholder-profile-icon-8qmjk1094ijhbem9.jpg",
			},
		}),
		prisma.user.create({
			data: {
				name: "Jimmy",
				email: "jimmy@example.com",
				image: "https://img.freepik.com/premium-vector/man-empty-avatar-casual-business-style-vector-photo-placeholder-social-networks-resumes_885953-434.jpg?semt=ais_incoming&w=740&q=80",
			},
		}),
		prisma.user.create({
			data: {
				name: "Yuxi",
				email: "yuxi@example.com",
				image: "https://cdn.vectorstock.com/i/500p/44/00/default-avatar-photo-placeholder-icon-grey-vector-38594400.jpg",
			},
		}),
	]);

	const skills = await Promise.all([
		prisma.skill.create({
			data: {
				name: "React",
				innerColor: "#61DAFB",
				outerColor: "#282C34",
			},
		}),
		prisma.skill.create({
			data: {
				name: "TypeScript",
				innerColor: "#FFFFFF",
				outerColor: "#3178C6",
			},
		}),
		prisma.skill.create({
			data: {
				name: "Node.js",
				innerColor: "#FFFFFF",
				outerColor: "#68A063",
			},
		}),
		prisma.skill.create({
			data: {
				name: "PostgreSQL",
				innerColor: "#FFFFFF",
				outerColor: "#336791",
			},
		}),
		prisma.skill.create({
			data: {
				name: "Figma",
				innerColor: "#FFFFFF",
				outerColor: "#F24E1E",
			},
		}),
		prisma.skill.create({
			data: {
				name: "CSS",
				innerColor: "#FFFFFF",
				outerColor: "#239120",
			},
		}),
	]);

	const project1 = await createProject(users[0].id, {
		name: "PairProj",
		githubLink: "https://github.com/phill52/PairProj",
		difficulty: "Intermediate",
		description: "Test description",
		skills: [skills[0].id, skills[1].id],
		areasOfInterest: [],
		roles: [
			{
				name: "Frontend Developer",
				outerColor: "#3B82F6",
				innerColor: "#FFFFFF",
				description: "Responsible for UI/UX implementation",
				optionalSkillIds: [skills[5].id],
				requiredSkillIds: [skills[0].id, skills[1].id],
			},
			{
				name: "Backend Developer",
				outerColor: "#10B981",
				innerColor: "#FFFFFF",
				description: "Responsible for server and database logic",
				optionalSkillIds: [skills[3].id],
				requiredSkillIds: [skills[2].id, skills[1].id],
			},
			{
				name: "UI/UX Designer",
				outerColor: "#F59E0B",
				innerColor: "#FFFFFF",
				description: "Responsible for design and user experience",
				optionalSkillIds: [],
				requiredSkillIds: [skills[4].id],
			},
		],
	});

	const project2 = await createProject(users[1].id, {
		name: "myproject",
		githubLink: "https://github.com/phill52/PairProj",
		difficulty: "Beginner",
		description: "test project",
		skills: [skills[2].id, skills[5].id],
		areasOfInterest: [],
		roles: [
			{
				name: "test1",
				outerColor: "#37465e",
				innerColor: "#c41717",
				description: "test d",
				optionalSkillIds: [skills[5].id],
				requiredSkillIds: [],
			},
			{
				name: "test2",
				outerColor: "#8dc6b3",
				innerColor: "#3d3a3a",
				description: "aaaaaaaaaaa",
				optionalSkillIds: [],
				requiredSkillIds: [skills[4].id, skills[1].id],
			},
		],
	});

	// const updated1 = await updateProject(
	// 	userId,
	// 	project1.id,
	// 	"PairProjTwo",
	// 	"https://https://github.com/phill52/PairProj",
	// 	"hard",
	// 	"Testing project update",
	// 	[],
	// 	[],
	// 	[
	// 		{
	// 			name: "Project Lead",
	// 			outerColor: "#8B5CF6",
	// 			innerColor: "#FFFFFF",
	// 			requiredSkillIds: [],
	// 			optionalSkillIds: [],
	// 		},
	// 		{
	// 			name: "QA Engineer",
	// 			outerColor: "#EC4899",
	// 			innerColor: "#FFFFFF",
	// 			requiredSkillIds: [],
	// 			optionalSkillIds: [],
	// 		},
	// 	]
	// );
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
