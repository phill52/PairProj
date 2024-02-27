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
import { useState } from "react";

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
	technologies: string[];
}

const mockProjects: Project[] = [
	{
		id: 1,
		image: "/images/temp_company_logo.jpg",
		name: "Probability",
		organization: "TensorFlow",
		likes: 73600,
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
		technologies: ["Machine Learning", "Statistics", "C++", "Python"],
	},
	{
		id: 2,
		image: "/images/temp_company_logo.jpg",
		name: "Material UI",
		organization: "MUI",
		likes: 90300,
		description:
			"Ready-to-use foundational React components, free forever. It includes Material UI, which implements Google's Material Design.",
		currentNeeds: [],
		contributorFriendlyIssues: 92,
		collaborators: 1324,
		level: "Beginner",
		tags: ["Good for Beginners", "Active Community"],
		technologies: ["JavaScript", "TypeScript", "Node"],
	},
	{
		id: 3,
		image: "/images/temp_company_logo.jpg",
		name: "React Native",
		organization: "Meta",
		likes: 113700,
		description:
			"A framework for building native applications using React.",
		currentNeeds: [
			{ title: "UI Designer", amount: 1 },
			{ title: "More", amount: 7 },
		],
		contributorFriendlyIssues: 37,
		collaborators: 413,
		level: "Intermediate",
		tags: ["Active Community", "Mentorship Opportunities"],
		technologies: ["JavaScript", "Java", "C++", "Node"],
	},
	{
		id: 4,
		image: "/images/temp_company_logo.jpg",
		name: "Kubernetes",
		organization: "Kubernetes",
		likes: 104400,
		description: "Production-Grade Container Scheduling and Management",
		currentNeeds: [],
		contributorFriendlyIssues: 158,
		collaborators: 9420,
		level: "Advanced",
		tags: [],
		technologies: ["Go"],
	},
	{
		id: 5,
		image: "/images/temp_company_logo.jpg",
		name: "Elastic Search",
		organization: "Elastic",
		likes: 66300,
		description: "Free and Open, Distributed, RESTful Search Engine",
		currentNeeds: [],
		contributorFriendlyIssues: 204,
		collaborators: 820,
		level: "Beginner",
		tags: [],
		technologies: ["Java"],
	},
	{
		id: 6,
		image: "/images/temp_company_logo.jpg",
		name: "Redux Toolkit",
		organization: "Redux",
		likes: 10100,
		description:
			"The official, opinionated, batteries-included toolset for efficient Redux development",
		currentNeeds: [],
		contributorFriendlyIssues: 6,
		collaborators: 1320,
		level: "Advanced",
		tags: [],
		technologies: ["Node", "JavaScript", "TypeScript"],
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
	maxWidth: "24rem",
	height: "100%",
	margin: "1rem",
};

export default function Page() {
	const [mockLikes, setMockLikes] = useState<number[]>([]);
	const handleLike = (id: number) => {
		if (mockLikes.includes(id)) {
			setMockLikes(mockLikes.filter((like) => like !== id));
		} else {
			setMockLikes([...mockLikes, id]);
		}
	};

	return (
		<div
			className="mx-auto grid max-w-7xl grid-cols-1 flex-wrap justify-center gap-8 p-4 sm:grid-cols-2 md:grid-cols-3"
			style={{
				gridTemplateColumns: "repeat(auto-fill, minmax(24rem, 1fr))",
			}}
		>
			{mockProjects.map((project, index) => (
				<Card key={index} style={cardStyle}>
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
							<Image
								alt="heart"
								height={30}
								src={
									mockLikes.includes(project.id)
										? "/icons/filled-heart.svg"
										: "/icons/heart.svg"
								}
								width={30}
								style={{
									filter: "invert(57%) sepia(31%) saturate(6354%) hue-rotate(329deg) brightness(95%) contrast(93%)",
								}}
								onClick={() => handleLike(project.id)}
							/>
							<div className="flex flex-row items-start gap-1">
								<Image
									alt="star"
									height={20}
									src="/icons/white-medium-star.svg"
									width={20}
								/>
								<p>{project.likes}</p>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="">
							<div className="space-y-2">
								<p>{project.description}</p>
								{project.currentNeeds.length > 0 && (
									<div className="font-bold">
										<ul>
											<p>Currently need:</p>
											{project.currentNeeds.map(
												(need, i) => (
													<li key={i}>
														{need.amount}{" "}
														{need.title}
													</li>
												),
											)}
										</ul>
									</div>
								)}
								<p style={{ color: "#7837B9" }}>
									{project.contributorFriendlyIssues}{" "}
									contributor friendly issues
								</p>
								<p className="font-semibold">
									{project.collaborators} collaborators
								</p>
								<p>Level: {project.level}</p>
							</div>
						</div>
						<div>
							<p>Tags: {project.tags.join(", ")}</p>
							<p>
								Technologies: {project.technologies.join(", ")}
							</p>
						</div>
					</CardContent>
					<CardFooter>
						<Button>View Project</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
