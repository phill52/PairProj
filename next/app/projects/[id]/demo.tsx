//Demo page shows sample data for testing the project view page without backend functions
import ProjectDetails from "./project-details";

export default function DemoPage() {
	const sampleProject = {
		id: "demo-project-1",
		name: "PairProj Platform",
		description:
			"PairProj is a platform that connects developers with compatible team members and open source projects based on skills, experience level, and project interests.",
		owner_profile_id: "user-123",
		skill_level: "Beginner to Advanced",
		github_repository: "https://github.com/phill52/PairProj",
		is_locked: false,
		profile_picture: null,
		created_at: new Date("2024-01-15"),
		roles: [
			{
				id: "role-1",
				name: "Full Stack Developer",
				skills: [
					{
						id: "skill-1",
						name: "React",
						innerColor: "#61DAFB",
						outerColor: "#0A1929",
						isRequired: true,
					},
					{
						id: "skill-2",
						name: "TypeScript",
						innerColor: "#3178C6",
						outerColor: "#0A1929",
						isRequired: true,
					},
					{
						id: "skill-3",
						name: "Next.js",
						innerColor: "#000000",
						outerColor: "#FFFFFF",
						isRequired: true,
					},
					{
						id: "skill-4",
						name: "Node.js",
						innerColor: "#68A063",
						outerColor: "#0A1929",
						isRequired: true,
					},
					{
						id: "skill-5",
						name: "MySQL",
						innerColor: "#00758F",
						outerColor: "#0A1929",
						isRequired: true,
					},
					{
						id: "skill-6",
						name: "Tailwind CSS",
						innerColor: "#06B6D4",
						outerColor: "#0A1929",
						isRequired: false,
					},
				],
			},
			{
				id: "role-2",
				name: "Database Engineer",
				skills: [
					{
						id: "skill-7",
						name: "MySQL",
						innerColor: "#00758F",
						outerColor: "#0A1929",
						isRequired: true,
					},
					{
						id: "skill-8",
						name: "Drizzle ORM",
						innerColor: "#C5B358",
						outerColor: "#0A1929",
						isRequired: true,
					},
					{
						id: "skill-9",
						name: "Database Design",
						innerColor: "#E34C26",
						outerColor: "#0A1929",
						isRequired: true,
					},
					{
						id: "skill-10",
						name: "Query Optimization",
						innerColor: "#FF6B6B",
						outerColor: "#0A1929",
						isRequired: false,
					},
				],
			},
			{
				id: "role-3",
				name: "UI/UX Designer",
				skills: [
					{
						id: "skill-11",
						name: "Figma",
						innerColor: "#A259FF",
						outerColor: "#0A1929",
						isRequired: true,
					},
					{
						id: "skill-12",
						name: "Tailwind CSS",
						innerColor: "#06B6D4",
						outerColor: "#0A1929",
						isRequired: true,
					},
					{
						id: "skill-13",
						name: "React",
						innerColor: "#61DAFB",
						outerColor: "#0A1929",
						isRequired: false,
					},
				],
			},
		],
	};

	return <ProjectDetails project={sampleProject} />;
}
