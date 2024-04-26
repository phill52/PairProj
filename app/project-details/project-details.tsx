"use client";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import skillIcons from "@/components/skillIcons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import "../globals.css";
import { relative } from "path";
import React from "react";

interface Project {
	id: number;
	image: string;
	name: string;
	organization: string;
	likes: number;
	description: string;
	currentNeeds: {
		title: string;
		amount: number;
	}[];
	contributorFriendlyIssues: number;
	collaborators: number;
	level: string;
	tags: string[];
	requiredTechnologies: string[];
	technologies: string[];
}

const mockProjects: Project[] = [
	{
		id: 1,
		image: "/images/temp_company_logo.jpg",
		name: "Probability",
		organization: "TensorFlow",
		likes: 73609,
		description:
			"Probabilistic reasoning and statistical analysis in TensorFlow",
		currentNeeds: [
			{ title: "UI Designer", amount: 1 },
			{ title: "ML Engineer", amount: 1 },
		],
		contributorFriendlyIssues: 40,
		collaborators: 324,
		level: "Advanced",
		tags: ["Active Community"],
		requiredTechnologies: ["Machine Learning", "Python"],
		technologies: ["C++"],
	},
	{
		id: 2,
		image: "/images/temp_company_logo.jpg",
		name: "Material UI",
		organization: "MUI",
		likes: 90312,
		description:
			"Ready-to-use foundational React components, free forever. It includes Material UI, which implements Google's Material Design.",
		currentNeeds: [],
		contributorFriendlyIssues: 92,
		collaborators: 1324,
		level: "Beginner",
		tags: ["Good for Beginners", "Active Community"],
		requiredTechnologies: ["JavaScript"],
		technologies: ["TypeScript", "Node"],
	},
	{
		id: 3,
		image: "/images/temp_company_logo.jpg",
		name: "React Native",
		organization: "Meta",
		likes: 113714,
		description:
			"A framework for building native applications using React.",
		currentNeeds: [
			{ title: "UI Designer", amount: 1 },
			{ title: "More", amount: 7 },
		],
		contributorFriendlyIssues: 37,
		collaborators: 413,
		level: "Intermediate",
		tags: [
			"Active Community",
			"Mentorship Opportunities",
			"Good for Beginners",
		],
		requiredTechnologies: ["JavaScript"],
		technologies: ["Java", "C++", "Node"],
	},
	{
		id: 4,
		image: "/images/temp_company_logo.jpg",
		name: "Kubernetes",
		organization: "Kubernetes",
		likes: 104466,
		description: "Production-Grade Container Scheduling and Management",
		currentNeeds: [],
		contributorFriendlyIssues: 158,
		collaborators: 9420,
		level: "Advanced",
		tags: ["Recently Popular"],
		requiredTechnologies: [],
		technologies: ["Golang"],
	},
	{
		id: 5,
		image: "/images/temp_company_logo.jpg",
		name: "Elastic Search",
		organization: "Elastic",
		likes: 66389,
		description: "Free and Open, Distributed, RESTful Search Engine",
		currentNeeds: [],
		contributorFriendlyIssues: 204,
		collaborators: 820,
		level: "Beginner",
		tags: ["New Project", "Good for Beginners"],
		requiredTechnologies: ["Java"],
		technologies: [],
	},
	{
		id: 6,
		image: "/images/temp_company_logo.jpg",
		name: "Redux Toolkit",
		organization: "Redux",
		likes: 10141,
		description:
			"The official, opinionated, batteries-included toolset for efficient Redux development",
		currentNeeds: [],
		contributorFriendlyIssues: 6,
		collaborators: 1320,
		level: "Advanced",
		tags: ["Well Maintained", "Active Community"],
		requiredTechnologies: ["JavaScript", "TypeScript"],
		technologies: ["Node"],
	},
];

const cardStyle = {
	boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
	transition: "0.3s",
	borderRadius: "5px",
	backgroundColor: "#fff",
	color: "#333",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	margin: "0.5rem",
};

const inter = Inter({ subsets: ["latin"] });

export default function ProjectDetails() {
	const router = useRouter();
	const id = 1;
	let project = mockProjects.find((x) => x.id == id);
	return (
		<div className={inter.className}>
			{project && (
				<div className="flex min-h-screen w-screen bg-[#CBD5E1]">
					<Sidebar />
					<div>
						<Card style={cardStyle as React.CSSProperties}>
							<CardHeader className="flex flex-row items-center justify-between gap-3 p-4">
								<div className="flex flex-row items-center gap-3">
									<Image
										alt="Company Logo"
										height={50}
										src={project.image}
										width={50}
										className="rounded-full object-cover"
									/>
									<div className="flex flex-col">
										<CardTitle>{project.name}</CardTitle>
										<CardDescription>
											{project.organization}
										</CardDescription>
									</div>
								</div>
								<div className="flex flex-col items-end">
									<span
										className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5 ${project.level === "Advanced" ? "bg-red-100 text-red-800" : project.level === "Beginner" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
									>
										{project.level}
									</span>
								</div>
							</CardHeader>
							<CardContent>
								<div className="">
									<div className="space-y-2">
										<p> {project.description} </p>
									</div>
									<div className="mt-3 flex flex-wrap gap-2">
										{project.tags.map((tag, i) => (
											<span
												key={i}
												className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold leading-5 text-blue-800"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</CardContent>
						</Card>

						<br />

						<Card style={cardStyle as React.CSSProperties}>
							<CardHeader className="flex flex-row items-center justify-between gap-3 p-4">
								<div className="flex flex-col">
									<CardTitle>
										Currently Needed Roles
									</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<div className="">
									<div className="mt-3 flex flex-wrap gap-2">
										{project.currentNeeds &&
											project.currentNeeds.map(
												({ title, amount }, i) => (
													<span
														key={i}
														className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold leading-5 text-blue-800"
													>
														{title} ({amount})
													</span>
												),
											)}
										{project.currentNeeds.length == 0 && (
											<span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold leading-5 text-blue-800">
												N/A
											</span>
										)}
									</div>
								</div>
							</CardContent>
						</Card>

						<br />

						<Card style={cardStyle as React.CSSProperties}>
							<CardHeader className="flex flex-row items-center justify-between gap-3 p-4">
								<div className="flex flex-col">
									<CardTitle>Tech Stack</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<div className="">
									<div className="mt-3 flex flex-wrap gap-2">
										<span>
											<b>Required: </b>{" "}
											{project.requiredTechnologies
												.length != 0
												? project.requiredTechnologies.join(
														", ",
													)
												: "N/A"}
										</span>
									</div>

									<div className="mt-3 flex flex-wrap gap-2">
										<span>
											<b>Preferred: </b>{" "}
											{project.technologies.length != 0
												? project.technologies.join(
														", ",
													)
												: "N/A"}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>

						<br />

						<div className="flex flex-col items-center justify-center">
							<Button>
								View Collaborators ({project.collaborators})
							</Button>
							<br />
							<Button>Apply Now</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
