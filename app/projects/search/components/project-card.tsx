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
import { useState, useMemo } from "react";
import skillIcons from "@/components/skillIcons";
import { FilterObject, useFilters } from "../FiltersContext";
import Link from "next/link";

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
	maxWidth: "24rem",
	height: "100%",
	margin: "0.5rem",
};

const filterProjects = (projects: Project[], filters: FilterObject[]) => {
	// filter projects based on the skills filters for now
	// should be able to filter all types of filters in backend
	if (filters.length === 0) return projects;

	for (const filterObj of filters) {
		switch (filterObj.label) {
			case "skills":
				projects = projects.filter((project) => {
					const technologies = [
						...project.requiredTechnologies,
						...project.technologies,
					];
					return technologies.includes(filterObj.value);
				});
				break;
			default:
				break;
		}
	}

	return projects;
};

export default function ProjectCard() {
	const [likes, setLikes] = useState<number[]>([]);
	const { filtersSelected, query } = useFilters();

	const projects = useMemo(() => {
		let filteredProjects = filterProjects(mockProjects, filtersSelected);
		if (query) {
			filteredProjects = filteredProjects.filter((project) =>
				project.name.toLowerCase().includes(query.toLowerCase()),
			);
		}
		return filteredProjects;
	}, [mockProjects, filtersSelected, query]);

	const handleLike = (id: number) => {
		if (likes.includes(id)) {
			setLikes(likes.filter((like) => like !== id));
			// addLike(id);
		} else {
			setLikes([...likes, id]);
			// removeLike(id);
		}
	};

	return (
		<div
			className="mx-auto grid max-w-7xl grid-cols-1 flex-wrap justify-center gap-8 p-4 sm:grid-cols-2 md:grid-cols-3"
			style={{
				gridTemplateColumns: "repeat(auto-fill, minmax(24rem, 1fr))",
			}}
		>
			{projects.map((project, index) => (
				<Card key={index} style={cardStyle as React.CSSProperties}>
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
									likes.includes(project.id)
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
								<p className="font-semibold text-purple-600">
									{project.contributorFriendlyIssues}{" "}
									contributor friendly issues
								</p>
								<p className="font-semibold">
									{project.collaborators} collaborators
								</p>
								<span
									className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5 ${project.level === "Advanced" ? "bg-red-100 text-red-800" : project.level === "Beginner" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
								>
									{project.level}
								</span>
							</div>
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
						<div className="relative mt-3 flex flex-wrap gap-2">
							{project.requiredTechnologies
								.concat(project.technologies)
								.map((tech, i) => {
									const isRequired =
										project.requiredTechnologies.includes(
											tech,
										);
									const iconSrc = skillIcons[tech];
									return (
										<div
											key={i}
											className="relative flex items-center"
										>
											<span
												className={`group inline-flex items-center rounded-full p-0.5 ${
													filtersSelected?.some(
														(l) =>
															l.label ===
															"skills",
													)
														? filtersSelected.some(
																(s) =>
																	s.label ===
																		"skills" &&
																	tech ===
																		s.value,
															)
															? "bg-gradient-to-br from-indigo-500 to-teal-400"
															: "grayscale filter"
														: ""
												}`}
											>
												<span
													className={`text-gray-800" inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold leading-5`}
												>
													{tech}
													{iconSrc && (
														<Image
															alt={`${tech} icon`}
															src={iconSrc}
															width={28}
															height={28}
															className="mr-2"
														/>
													)}
													{isRequired && (
														<span className="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md">
															<Image
																alt="Required"
																src="/icons/double-exclamation-mark.svg"
																width={12}
																height={12}
																style={{
																	filter: "invert(31%) sepia(56%) saturate(5736%) hue-rotate(349deg) brightness(94%) contrast(96%)",
																}}
															/>
														</span>
													)}
												</span>
											</span>
										</div>
									);
								})}
						</div>
					</CardContent>
					<CardFooter className="mt-auto justify-end">
						<Link href={`/projects/details/${project.id}`}>
							<Button size="icon" variant="ghost">
								<Image
									alt="View Project"
									src="/icons/chevron-circle-right.svg"
									width={48}
									height={48}
								/>
							</Button>
						</Link>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
