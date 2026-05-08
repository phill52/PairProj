import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { createProject } from "@/lib/projects";
import db from "@/lib/prisma";

const prisma = new PrismaClient();

function getRoleByName(
	roles: { id: string; name: string }[],
	roleName: string,
	projectName: string,
) {
	const role = roles.find((item) => item.name === roleName);
	if (!role) {
		throw new Error(
			`Role "${roleName}" was not found for project "${projectName}".`,
		);
	}
	return role;
}

async function main() {
	const userId = process.env.SEED_USER_ID;

	if (!userId) {
		throw new Error(
			"Missing seed user id. Set SEED_USER_ID in your environment.",
		);
	}

	const seedOwner = await prisma.user.findUnique({
		where: { id: userId },
	});

	if (!seedOwner) {
		throw new Error(
			`Seed owner with ID ${userId} was not found. Aborting cleanup.`,
		);
	}

	await prisma.$transaction(async (tx) => {
		await tx.roleRequiredSkill.deleteMany();
		await tx.roleOptionalSkill.deleteMany();
		await tx.projectApplication.deleteMany();
		await tx.projectMembership.deleteMany();
		await tx.label.deleteMany();
		await tx.issue.deleteMany();
		await tx.role.deleteMany();
		await tx.project.deleteMany();

		await tx.skillsOnUsers.deleteMany();
		await tx.education.deleteMany();
		await tx.experience.deleteMany();

		await tx.areaOfInterest.deleteMany();
		await tx.skill.deleteMany();

		await tx.verificationToken.deleteMany();
		await tx.account.deleteMany({ where: { userId: { not: userId } } });
		await tx.session.deleteMany({ where: { userId: { not: userId } } });
		await tx.user.deleteMany({ where: { id: { not: userId } } });
	});

	const users = await Promise.all([
		prisma.user.upsert({
			where: { email: "justin@example.com" },
			update: {
				name: "Justin",
				image: "https://wallpapers.com/images/hd/placeholder-profile-icon-8qmjk1094ijhbem9.jpg",
			},
			create: {
				name: "Justin",
				email: "justin@example.com",
				image: "https://wallpapers.com/images/hd/placeholder-profile-icon-8qmjk1094ijhbem9.jpg",
			},
		}),
		prisma.user.upsert({
			where: { email: "jimmy@example.com" },
			update: {
				name: "Jimmy",
				image: "https://img.freepik.com/premium-vector/man-empty-avatar-casual-business-style-vector-photo-placeholder-social-networks-resumes_885953-434.jpg?semt=ais_incoming&w=740&q=80",
			},
			create: {
				name: "Jimmy",
				email: "jimmy@example.com",
				image: "https://img.freepik.com/premium-vector/man-empty-avatar-casual-business-style-vector-photo-placeholder-social-networks-resumes_885953-434.jpg?semt=ais_incoming&w=740&q=80",
			},
		}),
		prisma.user.upsert({
			where: { email: "yuxi@example.com" },
			update: {
				name: "Yuxi",
				image: "https://cdn.vectorstock.com/i/500p/44/00/default-avatar-photo-placeholder-icon-grey-vector-38594400.jpg",
			},
			create: {
				name: "Yuxi",
				email: "yuxi@example.com",
				image: "https://cdn.vectorstock.com/i/500p/44/00/default-avatar-photo-placeholder-icon-grey-vector-38594400.jpg",
			},
		}),
		prisma.user.upsert({
			where: { email: "ava@example.com" },
			update: {
				name: "Ava",
				image: "https://placehold.co/256x256/png?text=A",
			},
			create: {
				name: "Ava",
				email: "ava@example.com",
				image: "https://placehold.co/256x256/png?text=A",
			},
		}),
		prisma.user.upsert({
			where: { email: "noah@example.com" },
			update: {
				name: "Noah",
				image: "https://placehold.co/256x256/png?text=N",
			},
			create: {
				name: "Noah",
				email: "noah@example.com",
				image: "https://placehold.co/256x256/png?text=N",
			},
		}),
		prisma.user.upsert({
			where: { email: "mia@example.com" },
			update: {
				name: "Mia",
				image: "https://placehold.co/256x256/png?text=M",
			},
			create: {
				name: "Mia",
				email: "mia@example.com",
				image: "https://placehold.co/256x256/png?text=M",
			},
		}),
		prisma.user.upsert({
			where: { email: "priya@example.com" },
			update: {
				name: "Priya",
				image: "https://placehold.co/256x256/png?text=P",
			},
			create: {
				name: "Priya",
				email: "priya@example.com",
				image: "https://placehold.co/256x256/png?text=P",
			},
		}),
		prisma.user.upsert({
			where: { email: "leo@example.com" },
			update: {
				name: "Leo",
				image: "https://placehold.co/256x256/png?text=L",
			},
			create: {
				name: "Leo",
				email: "leo@example.com",
				image: "https://placehold.co/256x256/png?text=L",
			},
		}),
		prisma.user.upsert({
			where: { email: "sofia@example.com" },
			update: {
				name: "Sofia",
				image: "https://placehold.co/256x256/png?text=S",
			},
			create: {
				name: "Sofia",
				email: "sofia@example.com",
				image: "https://placehold.co/256x256/png?text=S",
			},
		}),
	]);

	const [justin, jimmy, yuxi, ava, noah, mia, priya, leo, sofia] = users;

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
		prisma.skill.create({
			data: {
				name: "Python",
				innerColor: "#FFD43B",
				outerColor: "#3776AB",
			},
		}),
		prisma.skill.create({
			data: {
				name: "Next.js",
				innerColor: "#FFFFFF",
				outerColor: "#000000",
			},
		}),
		prisma.skill.create({
			data: {
				name: "Tailwind CSS",
				innerColor: "#FFFFFF",
				outerColor: "#38BDF8",
			},
		}),
		prisma.skill.create({
			data: {
				name: "Docker",
				innerColor: "#FFFFFF",
				outerColor: "#2496ED",
			},
		}),
		prisma.skill.create({
			data: {
				name: "AWS",
				innerColor: "#FFFFFF",
				outerColor: "#FF9900",
			},
		}),
		prisma.skill.create({
			data: {
				name: "Go",
				innerColor: "#FFFFFF",
				outerColor: "#00ADD8",
			},
		}),
		prisma.skill.create({
			data: {
				name: "Rust",
				innerColor: "#FFFFFF",
				outerColor: "#DEA584",
			},
		}),
		prisma.skill.create({
			data: {
				name: "UX Research",
				innerColor: "#FFFFFF",
				outerColor: "#7C3AED",
			},
		}),
		prisma.skill.create({
			data: {
				name: "Product Management",
				innerColor: "#FFFFFF",
				outerColor: "#0F766E",
			},
		}),
		prisma.skill.create({
			data: {
				name: "Data Visualization",
				innerColor: "#FFFFFF",
				outerColor: "#4C51BF",
			},
		}),
	]);

	const areasOfInterest = await Promise.all([
		prisma.areaOfInterest.create({
			data: {
				name: "Education",
				innerColor: "#EFF6FF",
				outerColor: "#2563EB",
			},
		}),
		prisma.areaOfInterest.create({
			data: {
				name: "Sustainability",
				innerColor: "#ECFDF5",
				outerColor: "#16A34A",
			},
		}),
		prisma.areaOfInterest.create({
			data: {
				name: "Healthcare",
				innerColor: "#FEF2F2",
				outerColor: "#DC2626",
			},
		}),
		prisma.areaOfInterest.create({
			data: {
				name: "Developer Tools",
				innerColor: "#F1F5F9",
				outerColor: "#0F172A",
			},
		}),
		prisma.areaOfInterest.create({
			data: {
				name: "Community",
				innerColor: "#FFF7ED",
				outerColor: "#F97316",
			},
		}),
	]);

	const seedUser = await prisma.user.findUnique({
		where: { id: userId },
	});

	if (!seedUser) {
		throw new Error(`User with ID ${userId} was not found`);
	}

	await prisma.skillsOnUsers.createMany({
		data: [
			{ userId, skillId: skills[0].id, skillLevel: "Advanced" },
			{ userId, skillId: skills[1].id, skillLevel: "Advanced" },
			{ userId, skillId: skills[6].id, skillLevel: "Advanced" },
			{
				userId: justin.id,
				skillId: skills[0].id,
				skillLevel: "Advanced",
			},
			{
				userId: justin.id,
				skillId: skills[1].id,
				skillLevel: "Advanced",
			},
			{
				userId: justin.id,
				skillId: skills[7].id,
				skillLevel: "Intermediate",
			},
			{
				userId: justin.id,
				skillId: skills[8].id,
				skillLevel: "Intermediate",
			},
			{ userId: jimmy.id, skillId: skills[2].id, skillLevel: "Advanced" },
			{
				userId: jimmy.id,
				skillId: skills[3].id,
				skillLevel: "Intermediate",
			},
			{
				userId: jimmy.id,
				skillId: skills[9].id,
				skillLevel: "Intermediate",
			},
			{ userId: yuxi.id, skillId: skills[4].id, skillLevel: "Advanced" },
			{
				userId: yuxi.id,
				skillId: skills[13].id,
				skillLevel: "Intermediate",
			},
			{
				userId: yuxi.id,
				skillId: skills[5].id,
				skillLevel: "Intermediate",
			},
			{ userId: ava.id, skillId: skills[4].id, skillLevel: "Advanced" },
			{ userId: ava.id, skillId: skills[13].id, skillLevel: "Advanced" },
			{
				userId: ava.id,
				skillId: skills[5].id,
				skillLevel: "Intermediate",
			},
			{ userId: noah.id, skillId: skills[2].id, skillLevel: "Advanced" },
			{ userId: noah.id, skillId: skills[3].id, skillLevel: "Advanced" },
			{
				userId: noah.id,
				skillId: skills[10].id,
				skillLevel: "Intermediate",
			},
			{
				userId: noah.id,
				skillId: skills[9].id,
				skillLevel: "Intermediate",
			},
			{ userId: mia.id, skillId: skills[14].id, skillLevel: "Advanced" },
			{
				userId: mia.id,
				skillId: skills[13].id,
				skillLevel: "Intermediate",
			},
			{
				userId: mia.id,
				skillId: skills[0].id,
				skillLevel: "Intermediate",
			},
			{ userId: priya.id, skillId: skills[0].id, skillLevel: "Advanced" },
			{ userId: priya.id, skillId: skills[1].id, skillLevel: "Advanced" },
			{
				userId: priya.id,
				skillId: skills[2].id,
				skillLevel: "Intermediate",
			},
			{ userId: leo.id, skillId: skills[6].id, skillLevel: "Advanced" },
			{ userId: leo.id, skillId: skills[15].id, skillLevel: "Advanced" },
			{
				userId: leo.id,
				skillId: skills[3].id,
				skillLevel: "Intermediate",
			},
			{
				userId: sofia.id,
				skillId: skills[0].id,
				skillLevel: "Intermediate",
			},
			{
				userId: sofia.id,
				skillId: skills[1].id,
				skillLevel: "Intermediate",
			},
			{
				userId: sofia.id,
				skillId: skills[8].id,
				skillLevel: "Intermediate",
			},
		],
		skipDuplicates: true,
	});

	const project1 = await createProject(userId, {
		name: "PairProj",
		githubLink: "https://github.com/phill52/PairProj",
		difficulty: "Intermediate",
		description: "Test description",
		skills: [],
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

	const project2 = await createProject(userId, {
		name: "Owen's Pantry Hub",
		githubLink: "https://github.com/phill52/PairProj",
		difficulty: "Easy",
		description:
			"A community pantry coordination app for scheduling pickups, donations, and volunteer shifts.",
		skills: [
			skills[0].id,
			skills[1].id,
			skills[2].id,
			skills[3].id,
			skills[4].id,
			skills[8].id,
		],
		areasOfInterest: [areasOfInterest[4].id, areasOfInterest[1].id],
		roles: [
			{
				name: "Frontend Developer",
				outerColor: "#2563EB",
				innerColor: "#FFFFFF",
				description: "Build the volunteer and donor web experience.",
				optionalSkillIds: [skills[8].id],
				requiredSkillIds: [skills[0].id, skills[1].id],
			},
			{
				name: "Backend Developer",
				outerColor: "#059669",
				innerColor: "#FFFFFF",
				description:
					"Design APIs for inventory, shifts, and notifications.",
				optionalSkillIds: [skills[9].id, skills[10].id],
				requiredSkillIds: [skills[2].id, skills[3].id],
			},
			{
				name: "Product Designer",
				outerColor: "#F59E0B",
				innerColor: "#FFFFFF",
				description:
					"Create accessible flows for volunteers and pantry staff.",
				optionalSkillIds: [skills[5].id],
				requiredSkillIds: [skills[4].id, skills[13].id],
			},
		],
	});

	const reactDashboard = await createProject(justin.id, {
		name: "React Dashboard",
		githubLink: "https://github.com/phill52/PairProj",
		difficulty: "Intermediate",
		description: "React skill test.",
		skills: [skills[0].id],
		areasOfInterest: [],
		roles: [
			{
				name: "React Developer",
				outerColor: "#0EA5E9",
				innerColor: "#FFFFFF",
				description: "react",
				optionalSkillIds: [],
				requiredSkillIds: [skills[0].id, skills[1].id],
			},
		],
	});

	const pythonApi = await createProject(justin.id, {
		name: "Python API",
		githubLink: "https://github.com/phill52/PairProj",
		difficulty: "Intermediate",
		description: "Python skill test.",
		skills: [skills[6].id],
		areasOfInterest: [],
		roles: [
			{
				name: "Python Developer",
				outerColor: "#F59E0B",
				innerColor: "#1F2937",
				description: "python",
				optionalSkillIds: [],
				requiredSkillIds: [skills[6].id],
			},
		],
	});

	const mentorMatch = await createProject(mia.id, {
		name: "MentorMatch",
		githubLink: "https://github.com/phill52/PairProj",
		difficulty: "Intermediate",
		description:
			"A mentorship platform that pairs students with professionals and schedules sessions.",
		skills: [
			skills[0].id,
			skills[1].id,
			skills[2].id,
			skills[3].id,
			skills[6].id,
			skills[13].id,
			skills[14].id,
		],
		areasOfInterest: [areasOfInterest[0].id, areasOfInterest[4].id],
		roles: [
			{
				name: "Full Stack Developer",
				outerColor: "#1D4ED8",
				innerColor: "#FFFFFF",
				description:
					"Own matching workflows, scheduling, and core API integration.",
				optionalSkillIds: [skills[7].id, skills[8].id],
				requiredSkillIds: [
					skills[0].id,
					skills[1].id,
					skills[2].id,
					skills[3].id,
				],
			},
			{
				name: "Data Engineer",
				outerColor: "#0F766E",
				innerColor: "#FFFFFF",
				description:
					"Build matching logic, data pipelines, and reporting.",
				optionalSkillIds: [skills[10].id],
				requiredSkillIds: [skills[6].id, skills[3].id],
			},
			{
				name: "UX Researcher",
				outerColor: "#7C3AED",
				innerColor: "#FFFFFF",
				description:
					"Plan interviews, test prototypes, and synthesize insights.",
				optionalSkillIds: [skills[4].id],
				requiredSkillIds: [skills[13].id],
			},
		],
	});

	const greenhouseMonitor = await createProject(noah.id, {
		name: "Greenhouse Monitor",
		githubLink: "https://github.com/phill52/PairProj",
		difficulty: "Intermediate",
		description:
			"Monitor greenhouse sensors, visualize trends, and alert staff on anomalies.",
		skills: [
			skills[0].id,
			skills[1].id,
			skills[2].id,
			skills[3].id,
			skills[8].id,
			skills[9].id,
			skills[10].id,
		],
		areasOfInterest: [areasOfInterest[1].id],
		roles: [
			{
				name: "Backend Developer",
				outerColor: "#10B981",
				innerColor: "#FFFFFF",
				description:
					"Ingest sensor data, store readings, and trigger alerts.",
				optionalSkillIds: [skills[9].id],
				requiredSkillIds: [skills[2].id, skills[3].id],
			},
			{
				name: "Frontend Developer",
				outerColor: "#3B82F6",
				innerColor: "#FFFFFF",
				description: "Build a dashboard with charts and live status.",
				optionalSkillIds: [skills[8].id],
				requiredSkillIds: [skills[0].id, skills[1].id],
			},
			{
				name: "DevOps Engineer",
				outerColor: "#F97316",
				innerColor: "#FFFFFF",
				description:
					"Deploy containers and manage cloud infrastructure.",
				optionalSkillIds: [skills[9].id],
				requiredSkillIds: [skills[10].id],
			},
		],
	});

	const civicInsight = await createProject(leo.id, {
		name: "Civic Insight Dashboard",
		githubLink: "https://github.com/phill52/PairProj",
		difficulty: "Intermediate",
		description:
			"An open-data dashboard that highlights city service trends and KPIs.",
		skills: [
			skills[0].id,
			skills[1].id,
			skills[6].id,
			skills[14].id,
			skills[15].id,
		],
		areasOfInterest: [areasOfInterest[3].id, areasOfInterest[4].id],
		roles: [
			{
				name: "Data Visualization Engineer",
				outerColor: "#4C51BF",
				innerColor: "#FFFFFF",
				description:
					"Create charts, transforms, and reporting views from open data.",
				optionalSkillIds: [skills[1].id],
				requiredSkillIds: [skills[15].id, skills[6].id],
			},
			{
				name: "Frontend Developer",
				outerColor: "#2563EB",
				innerColor: "#FFFFFF",
				description: "Build UI components, filters, and map views.",
				optionalSkillIds: [skills[8].id],
				requiredSkillIds: [skills[0].id, skills[1].id],
			},
			{
				name: "Product Manager",
				outerColor: "#0F766E",
				innerColor: "#FFFFFF",
				description:
					"Define roadmap, stakeholders, and success metrics.",
				optionalSkillIds: [skills[13].id],
				requiredSkillIds: [skills[14].id],
			},
		],
	});

	const [
		project1WithRoles,
		project2WithRoles,
		reactDashboardWithRoles,
		pythonApiWithRoles,
		mentorMatchWithRoles,
		greenhouseWithRoles,
		civicInsightWithRoles,
	] = await Promise.all([
		prisma.project.findUnique({
			where: { id: project1.id },
			include: { roles: true },
		}),
		prisma.project.findUnique({
			where: { id: project2.id },
			include: { roles: true },
		}),
		prisma.project.findUnique({
			where: { id: reactDashboard.id },
			include: { roles: true },
		}),
		prisma.project.findUnique({
			where: { id: pythonApi.id },
			include: { roles: true },
		}),
		prisma.project.findUnique({
			where: { id: mentorMatch.id },
			include: { roles: true },
		}),
		prisma.project.findUnique({
			where: { id: greenhouseMonitor.id },
			include: { roles: true },
		}),
		prisma.project.findUnique({
			where: { id: civicInsight.id },
			include: { roles: true },
		}),
	]);

	if (
		!project1WithRoles ||
		!project2WithRoles ||
		!reactDashboardWithRoles ||
		!pythonApiWithRoles ||
		!mentorMatchWithRoles ||
		!greenhouseWithRoles ||
		!civicInsightWithRoles
	) {
		throw new Error("One or more projects were not found after creation");
	}

	const pairprojFrontendRole = getRoleByName(
		project1WithRoles.roles,
		"Frontend Developer",
		project1WithRoles.name ?? "PairProj",
	);
	const pairprojBackendRole = getRoleByName(
		project1WithRoles.roles,
		"Backend Developer",
		project1WithRoles.name ?? "PairProj",
	);
	const pairprojDesignRole = getRoleByName(
		project1WithRoles.roles,
		"UI/UX Designer",
		project1WithRoles.name ?? "PairProj",
	);

	const pantryFrontendRole = getRoleByName(
		project2WithRoles.roles,
		"Frontend Developer",
		project2WithRoles.name ?? "Owen's Pantry Hub",
	);
	const pantryBackendRole = getRoleByName(
		project2WithRoles.roles,
		"Backend Developer",
		project2WithRoles.name ?? "Owen's Pantry Hub",
	);
	const pantryDesignerRole = getRoleByName(
		project2WithRoles.roles,
		"Product Designer",
		project2WithRoles.name ?? "Owen's Pantry Hub",
	);

	const reactDeveloperRole = getRoleByName(
		reactDashboardWithRoles.roles,
		"React Developer",
		reactDashboardWithRoles.name ?? "React Dashboard",
	);

	const pythonDeveloperRole = getRoleByName(
		pythonApiWithRoles.roles,
		"Python Developer",
		pythonApiWithRoles.name ?? "Python API",
	);

	const mentorFullStackRole = getRoleByName(
		mentorMatchWithRoles.roles,
		"Full Stack Developer",
		mentorMatchWithRoles.name ?? "MentorMatch",
	);
	const mentorDataRole = getRoleByName(
		mentorMatchWithRoles.roles,
		"Data Engineer",
		mentorMatchWithRoles.name ?? "MentorMatch",
	);
	const mentorUxRole = getRoleByName(
		mentorMatchWithRoles.roles,
		"UX Researcher",
		mentorMatchWithRoles.name ?? "MentorMatch",
	);

	const greenhouseBackendRole = getRoleByName(
		greenhouseWithRoles.roles,
		"Backend Developer",
		greenhouseWithRoles.name ?? "Greenhouse Monitor",
	);
	const greenhouseFrontendRole = getRoleByName(
		greenhouseWithRoles.roles,
		"Frontend Developer",
		greenhouseWithRoles.name ?? "Greenhouse Monitor",
	);
	const greenhouseDevOpsRole = getRoleByName(
		greenhouseWithRoles.roles,
		"DevOps Engineer",
		greenhouseWithRoles.name ?? "Greenhouse Monitor",
	);

	const civicDataVizRole = getRoleByName(
		civicInsightWithRoles.roles,
		"Data Visualization Engineer",
		civicInsightWithRoles.name ?? "Civic Insight Dashboard",
	);
	const civicFrontendRole = getRoleByName(
		civicInsightWithRoles.roles,
		"Frontend Developer",
		civicInsightWithRoles.name ?? "Civic Insight Dashboard",
	);
	const civicProductRole = getRoleByName(
		civicInsightWithRoles.roles,
		"Product Manager",
		civicInsightWithRoles.name ?? "Civic Insight Dashboard",
	);

	const joinedAt = new Date().toISOString();

	await prisma.projectMembership.createMany({
		data: [
			{
				userId: ava.id,
				projectId: project1.id,
				roleId: pairprojDesignRole.id,
				dateJoined: joinedAt,
			},
			{
				userId: noah.id,
				projectId: project1.id,
				roleId: pairprojBackendRole.id,
				dateJoined: joinedAt,
			},
			{
				userId: yuxi.id,
				projectId: project2.id,
				roleId: pantryBackendRole.id,
				dateJoined: joinedAt,
			},
			{
				userId: ava.id,
				projectId: project2.id,
				roleId: pantryDesignerRole.id,
				dateJoined: joinedAt,
			},
			{
				userId: priya.id,
				projectId: reactDashboard.id,
				roleId: reactDeveloperRole.id,
				dateJoined: joinedAt,
			},
			{
				userId: leo.id,
				projectId: pythonApi.id,
				roleId: pythonDeveloperRole.id,
				dateJoined: joinedAt,
			},
			{
				userId: jimmy.id,
				projectId: mentorMatch.id,
				roleId: mentorFullStackRole.id,
				dateJoined: joinedAt,
			},
			{
				userId: yuxi.id,
				projectId: mentorMatch.id,
				roleId: mentorDataRole.id,
				dateJoined: joinedAt,
			},
			{
				userId: ava.id,
				projectId: mentorMatch.id,
				roleId: mentorUxRole.id,
				dateJoined: joinedAt,
			},
			{
				userId: priya.id,
				projectId: greenhouseMonitor.id,
				roleId: greenhouseFrontendRole.id,
				dateJoined: joinedAt,
			},
			{
				userId: yuxi.id,
				projectId: greenhouseMonitor.id,
				roleId: greenhouseBackendRole.id,
				dateJoined: joinedAt,
			},
			{
				userId: mia.id,
				projectId: civicInsight.id,
				roleId: civicProductRole.id,
				dateJoined: joinedAt,
			},
		],
	});

	await prisma.projectApplication.createMany({
		data: [
			{
				userId: justin.id,
				projectId: project1.id,
				roleId: pairprojFrontendRole.id,
				body: "I am interested in helping with the frontend implementation.",
			},
			{
				userId: jimmy.id,
				projectId: project1.id,
				roleId: pairprojBackendRole.id,
				body: "I would like to contribute to backend development.",
			},
			{
				userId: sofia.id,
				projectId: project2.id,
				roleId: pantryFrontendRole.id,
				body: "Happy to help build the pantry web experience.",
			},
			{
				userId: leo.id,
				projectId: project2.id,
				roleId: pantryBackendRole.id,
				body: "I can support API development and reporting.",
			},
			{
				userId: mia.id,
				projectId: pythonApi.id,
				roleId: pythonDeveloperRole.id,
				body: "Interested in contributing to the Python services.",
			},
			{
				userId: sofia.id,
				projectId: mentorMatch.id,
				roleId: mentorFullStackRole.id,
				body: "Excited to help with the matching flows and UI.",
			},
			{
				userId: justin.id,
				projectId: greenhouseMonitor.id,
				roleId: greenhouseDevOpsRole.id,
				body: "I can help containerize and deploy the greenhouse app.",
			},
			{
				userId: noah.id,
				projectId: civicInsight.id,
				roleId: civicFrontendRole.id,
				body: "I'd like to contribute to the dashboard UI and filters.",
			},
			{
				userId: sofia.id,
				projectId: civicInsight.id,
				roleId: civicDataVizRole.id,
				body: "I can help build chart components and visuals.",
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
