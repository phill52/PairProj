import { db } from "./index";
import { role, skill, areas_of_interest } from "./schema";
import { sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

async function seed() {
	// Seed roles
	const roleData = [
		{ name: "Developer" },
		{ name: "Designer" },
		{ name: "Project Manager" },
		{ name: "QA Tester" },
		{ name: "DevOps Engineer" },
		{ name: "Data Scientist" },
		{ name: "Product Owner" },
	];
	await db.insert(role).values(roleData);

	// Seed skills
	const skillData = [
		{
			name: "JavaScript",
			icon_location: "@/public/skills/icons8-javascript.svg",
			inner_color: "#F0DB4F",
			outer_color: "#323330",
		},
		{
			name: "Python",
			icon_location: "@/public/skills/icons8-python.svg",
			inner_color: "#4B8BBE",
			outer_color: "#FFD43B",
		},
		{
			name: "React",
			icon_location: "@/public/skills/icons8-react.svg",
			inner_color: "#61DAFB",
			outer_color: "#282C34",
		},
		{
			name: "UI/UX Design",
			icon_location: "@/public/skills/icons8-uiux.svg",
			inner_color: "#FF6B6B",
			outer_color: "#4ECDC4",
		},
		{
			name: "Agile Methodology",
			icon_location: "@/public/skills/icons8-agile.svg",
			inner_color: "#6C5CE7",
			outer_color: "#FAD390",
		},
		{
			name: "Node.js",
			icon_location: "@/public/skills/icons8-nodejs.svg",
			inner_color: "#68A063",
			outer_color: "#3C873A",
		},
		{
			name: "Docker",
			icon_location: "@/public/skills/icons8-docker.svg",
			inner_color: "#0DB7ED",
			outer_color: "#384D54",
		},
		{
			name: "Machine Learning",
			icon_location: "@/public/skills/icons8-ml.svg",
			inner_color: "#FF9900",
			outer_color: "#146EB4",
		},
		{
			name: "Java",
			icon_location: "@/public/skills/icons8-java.svg",
			inner_color: "#FFA500",
			outer_color: "#007396",
		},
	];

	await db.insert(skill).values(skillData);

	// Seed areas of interest
	const areasData = [
		{
			name: "Frontend",
			inner_color: "#61DAFB",
			outer_color: "#282C34",
		},
		{
			name: "Backend",
			inner_color: "#4B8BBE",
			outer_color: "#FFD43B",
		},
		{
			name: "DevOps",
			inner_color: "#0DB7ED",
			outer_color: "#384D54",
		},
		{
			name: "Machine Learning",
			inner_color: "#FF9900",
			outer_color: "#146EB4",
		},
		{
			name: "UI/UX Design",
			inner_color: "#FF6B6B",
			outer_color: "#4ECDC4",
		},
		{
			name: "Data Science",
			inner_color: "#4B8BBE",
			outer_color: "#FFD43B",
		},
		{
			name: "Mobile Development",
			inner_color: "#61DAFB",
			outer_color: "#282C34",
		},
		{
			name: "Web Development",
			inner_color: "#4B8BBE",
			outer_color: "#FFD43B",
		},
	];
	await db.insert(areas_of_interest).values(areasData);
	console.log("Seed data inserted successfully");
	return;
}

try {
	seed();
} catch (e) {
	console.error(e);
}
