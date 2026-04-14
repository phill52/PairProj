"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { routes } from "@/routes/routes";

interface Project {
	id: string;
	name: string | null;
	description: string | null;
	githubLink: string | null;
	difficulty: string;
	isLocked: boolean;

	skills: { name: string }[];
	areasOfInterest: { name: string }[];

	ProjectMembership: {
		userId: string;
		projectId: string;
		role: string;
		dateJoined: string;
	}[];

	applications: {
		userId: string;
		status: string;
	}[];
}

export interface ProjectCardProps {
	projects: Project[];
}

export default function ProjectCard({ projects }: ProjectCardProps) {
	return (
		<div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3">
			{projects.map((project) => (
				<Card key={project.id} className="flex flex-col justify-between">
					<CardHeader>
						<CardTitle>{project.name ?? "Untitled Project"}</CardTitle>
						<CardDescription>{project.githubLink ?? "No link"}</CardDescription>
					</CardHeader>

					<CardContent className="space-y-3">
						<p>{project.description ?? "No description available"}</p>

						<span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold">
							{project.difficulty}
						</span>

						<div>
							<p className="font-semibold">Skills:</p>
							<div className="flex flex-wrap gap-2 mt-1">
								{project.skills.map((skill) => (
									<span
										key={skill.name}
										className="rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs font-semibold"
									>
										{skill.name}
									</span>
								))}
							</div>
						</div>

						<div>
							<p className="font-semibold">Areas:</p>
							<div className="flex flex-wrap gap-2 mt-1">
								{project.areasOfInterest.map((area) => (
									<span
										key={area.name}
										className="rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs font-semibold"
									>
										{area.name}
									</span>
								))}
							</div>
						</div>

						<div className="text-sm text-gray-600 space-y-1">
							<p>{project.ProjectMembership.length} members</p>
							<p>{project.applications.length} applications</p>
						</div>

						{project.isLocked && (
							<p className="text-red-500 font-semibold">
								Closed
							</p>
						)}
					</CardContent>

					<CardFooter className="justify-end">
						<Link
							href={routes.projects.project({
								id: project.id,
							})}
						>
							<Button>View</Button>
						</Link>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}

/*
const mockProjects: Project[] = [
	{
		id: "1",
		name: "Quest List: Gamified Task Manager",
		description:
			"Transform your daily tasks into quests with this gamified task manager. Built with React, it features RPG elements like experience points and leveling up for completed tasks.",
		githubLink: "https://github.com/example/quest-list",
		difficulty: "Intermediate",
		isLocked: false,

		skills: [{ name: "React" }, { name: "TypeScript" }],
		areasOfInterest: [{ name: "Productivity" }, { name: "Gamification" }],

		ProjectMembership: [
			{
				userId: "u1",
				projectId: "1",
				role: "Frontend Dev",
				dateJoined: "2026-01-01",
			},
			{
				userId: "u2",
				projectId: "1",
				role: "Backend Dev",
				dateJoined: "2026-01-05",
			},
		],

		applications: [{ userId: "u3", status: "pending" }],
	},

	{
		id: "2",
		name: "StoryBlog: Interactive Story Platform",
		description:
			"An interactive platform where users can write, share, and branch off stories. It uses Node.js for the backend, React for the frontend, and MongoDB for story storage.",
		githubLink: "https://github.com/example/storyblog",
		difficulty: "Intermediate",
		isLocked: false,

		skills: [{ name: "Node.js" }, { name: "React" }],
		areasOfInterest: [{ name: "Storytelling" }, { name: "Community" }],

		ProjectMembership: [
			{
				userId: "u3",
				projectId: "2",
				role: "Fullstack Dev",
				dateJoined: "2026-02-01",
			},
			{
				userId: "u4",
				projectId: "2",
				role: "UI Designer",
				dateJoined: "2026-02-03",
			},
		],

		applications: [{ userId: "u5", status: "pending" }],
	},

	{
		id: "3",
		name: "Magic Mixer: Cocktail App",
		description:
			"A Vue.js app for cocktail enthusiasts to create, share, and discover cocktail recipes. Features include ingredient filters, user ratings, and a 'surprise me' function.",
		githubLink: "https://github.com/example/magic-mixer",
		difficulty: "Intermediate",
		isLocked: false,

		skills: [{ name: "Vue.js" }],
		areasOfInterest: [{ name: "Food" }, { name: "Social" }],

		ProjectMembership: [
			{
				userId: "u5",
				projectId: "3",
				role: "Frontend Dev",
				dateJoined: "2026-03-01",
			},
		],

		applications: [],
	},

	{
		id: "4",
		name: "Planet Weather App",
		description:
			"Explore the weather of different planets in our solar system with this Angular app. Integrates real astronomical data to provide weather forecasts for space enthusiasts.",
		githubLink: "https://github.com/example/planet-weather",
		difficulty: "Intermediate",
		isLocked: false,

		skills: [{ name: "Angular" }, { name: "APIs" }],
		areasOfInterest: [{ name: "Space" }, { name: "Science" }],

		ProjectMembership: [
			{
				userId: "u6",
				projectId: "4",
				role: "Backend Dev",
				dateJoined: "2026-01-15",
			},
			{
				userId: "u7",
				projectId: "4",
				role: "Data Engineer",
				dateJoined: "2026-01-20",
			},
		],

		applications: [{ userId: "u8", status: "pending" }],
	},

	{
		id: "5",
		name: "Creative Portfolio",
		description:
			"A dynamic portfolio for artists to showcase their work. Built with React and integrated with a headless CMS for easy content management and updates.",
		githubLink: "https://github.com/example/creative-portfolio",
		difficulty: "Beginner",
		isLocked: false,

		skills: [{ name: "React" }, { name: "CMS" }],
		areasOfInterest: [{ name: "Art" }],

		ProjectMembership: [
			{
				userId: "u8",
				projectId: "5",
				role: "Frontend Dev",
				dateJoined: "2026-02-10",
			},
		],

		applications: [],
	},

	{
		id: "6",
		name: "Foodie Journal",
		description:
			"A MERN stack application for food lovers to share recipes, restaurant reviews, and culinary tips. Features include user authentication, favorites, and social sharing.",
		githubLink: "https://github.com/example/foodie-journal",
		difficulty: "Intermediate",
		isLocked: false,

		skills: [
			{ name: "MongoDB" },
			{ name: "Express" },
			{ name: "React" },
			{ name: "Node.js" },
		],
		areasOfInterest: [{ name: "Food" }, { name: "Social" }],

		ProjectMembership: [
			{
				userId: "u9",
				projectId: "6",
				role: "Fullstack Dev",
				dateJoined: "2026-03-05",
			},
			{
				userId: "u10",
				projectId: "6",
				role: "Backend Dev",
				dateJoined: "2026-03-06",
			},
			{
				userId: "u11",
				projectId: "6",
				role: "Frontend Dev",
				dateJoined: "2026-03-07",
			},
		],

		applications: [{ userId: "u12", status: "pending" }],
	},
];
*/