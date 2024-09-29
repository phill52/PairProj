import { db } from "./schema";
import { role, skill } from "./schema";
import { sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

async function seed() {
	// Seed roles
	const roleData = [
		{ id: uuidv4(), name: "Developer" },
		{ id: uuidv4(), name: "Designer" },
		{ id: uuidv4(), name: "Project Manager" },
		{ id: uuidv4(), name: "QA Tester" },
		{ id: uuidv4(), name: "DevOps Engineer" },
		{ id: uuidv4(), name: "Data Scientist" },
		{ id: uuidv4(), name: "Product Owner" },
	];
	await db.insert(role).values(roleData);

	// Seed skills
	const skillData = [
		{
			id: uuidv4(),
			name: "JavaScript",
			icon_location: "@/public/skills/icons8-javascript.svg",
			inner_color: "#F0DB4F",
			outer_color: "#323330",
		},
		{
			id: uuidv4(),
			name: "Python",
			icon_location: "@/public/skills/icons8-python.svg",
			inner_color: "#4B8BBE",
			outer_color: "#FFD43B",
		},
		{
			id: uuidv4(),
			name: "React",
			icon_location: "@/public/skills/icons8-react.svg",
			inner_color: "#61DAFB",
			outer_color: "#282C34",
		},
		{
			id: uuidv4(),
			name: "UI/UX Design",
			icon_location: "@/public/skills/icons8-uiux.svg",
			inner_color: "#FF6B6B",
			outer_color: "#4ECDC4",
		},
		{
			id: uuidv4(),
			name: "Agile Methodology",
			icon_location: "@/public/skills/icons8-agile.svg",
			inner_color: "#6C5CE7",
			outer_color: "#FAD390",
		},
		{
			id: uuidv4(),
			name: "Node.js",
			icon_location: "@/public/skills/icons8-nodejs.svg",
			inner_color: "#68A063",
			outer_color: "#3C873A",
		},
		{
			id: uuidv4(),
			name: "Docker",
			icon_location: "@/public/skills/icons8-docker.svg",
			inner_color: "#0DB7ED",
			outer_color: "#384D54",
		},
		{
			id: uuidv4(),
			name: "Machine Learning",
			icon_location: "@/public/skills/icons8-ml.svg",
			inner_color: "#FF9900",
			outer_color: "#146EB4",
		},
		{
			id: uuidv4(),
			name: "Java",
			icon_location: "@/public/skills/icons8-java.svg",
			inner_color: "#FFA500",
			outer_color: "#007396",
		},
	];

	await db.insert(skill).values(skillData);
	console.log("Seed data inserted successfully");
	return;
}

seed().catch(console.error);
