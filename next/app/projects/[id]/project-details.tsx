"use client";
import React from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { ProjectProps } from "@/types/projects";
import Badge from "@/components/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/routes/routes";

type Collaborator = {
	id: number;
	username: string;
	profilePicture: string;
	role: string;
};

export default function ProjectComponent({
	project,
}: {
	project: ProjectProps;
}) {
	return (
		<Card className="mx-auto my-8 max-w-[90%] rounded-lg bg-white shadow-lg">
			<CardHeader className="border-b p-6 pb-6">
				<CardTitle className="text-2xl font-bold">
					{project.name}
				</CardTitle>
				<p className="text-gray-600">{project.description}</p>
				<div className="mt-4 flex items-center justify-between">
					{/* <div className="font-semibold text-red-600"> TODO: Add skill level to project
						Skill Level: <strong>{project.skillLevel}</strong>
					</div> */}
				</div>
			</CardHeader>

			<CardContent className="p-6">
				{/* <section className="mb-6"> TODO: Add currently needed roles to project
					<h2 className="mb-2 text-xl font-semibold">
						Currently Needed Roles
					</h2>
					<div className="mb-2 flex space-x-2">
						{project.neededRoles.map((role, index) => (
							<span
								key={index}
								className="rounded-full bg-green-100 px-3 py-1 text-green-800"
							>
								{role}
							</span>
						))}
					</div>
				</section> */}

				<section className="mb-6">
					<h2 className="mb-2 text-xl font-semibold">Roles</h2>
					<div className="mb-2 flex space-x-2">
						{project.roles.map((role, index) => (
							<div key={index}>
								<h3
									key={index}
									className="text-lg font-semibold"
								>
									{role.name}
								</h3>
								<div className="mb-1 flex space-x-1">
									<strong>Skills:</strong>
									<div className="space-x-2">
										{role.skills.map((skill, index) => (
											<Badge
												text={skill.name}
												key={index}
												innerColor={skill.innerColor}
												outerColor={skill.outerColor}
											/>
										))}
									</div>
								</div>
								<div className="mb-1 flex space-x-1">
									<strong>Required Skill:</strong>
									<div className="space-x-2">
										{role.skills
											.filter((skill) => {
												return skill.isRequired;
											})
											.map((skill, index) => (
												<Badge
													text={skill.name}
													key={index}
													innerColor={
														skill.innerColor
													}
													outerColor={
														skill.outerColor
													}
												/>
											))}
									</div>
								</div>
							</div>
						))}
					</div>
					{/* <div className="mb-1 flex space-x-1">
						<strong>Required:</strong>
						<div className="space-x-2">
							{project.techStack.required.map((skill, index) => (
								<Badge
									text={skill.name}
									key={index}
									{...skill}
								/>
							))}
						</div>
					</div>
					<div className="mb-1 flex space-x-1">
						<strong>Preferred:</strong>{" "}
						<div className="space-x-2">
							{project.techStack.preferred.map((skill, index) => (
								<Badge
									text={skill.name}
									key={index}
									{...skill}
								/>
							))}
						</div>
					</div>
					<p className="text-green-600">
						You meet the minimum requirements to apply!
					</p> */}
				</section>

				{/* <section className="mb-6">
					<h2 className="mb-2 text-xl font-semibold">
						Current Collaborators ({project.collaborators.length}{" "}
						Total)
					</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						{project.collaborators.map((collaborator) => (
							<Link
								key={collaborator.id}
								href={routes.users.profile({
									id: collaborator.id,
								})}
							>
								<Card
									key={collaborator.id}
									className="flex items-center p-4"
								>
									<Avatar className="mr-4 h-16 w-16">
										<AvatarImage
											src={collaborator.profilePicture}
											alt={collaborator.username}
										/>
										<AvatarFallback className="text-2xl">
											{collaborator.username[0]}
										</AvatarFallback>
									</Avatar>
									<div>
										<h3 className="text-lg font-bold">
											{collaborator.username}
										</h3>
										<p className="text-gray-600">
											{collaborator.role}
										</p>
									</div>
								</Card>
							</Link>
						))}
					</div>
					<div className="mt-4 flex space-x-2">
						<Button>Invite</Button>
						<Button>Lock</Button>
						<Button>Applications</Button>
					</div>
				</section> */}
				<Link
					href={routes.projects.editor({ id: project.id })}
				>
					<Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md">
						Open Live Editor
					</Button>
				</Link>
			</CardContent>

			{/* <CardFooter className="flex items-center justify-between border-t p-6"> TODO: add project news
				<aside className="w-1/2">
					<h2 className="mb-2 text-xl font-semibold">
						Follow the project
					</h2>
					<p className="mb-2 text-gray-600">
						Most Recent Commit: {project.recentCommit}
					</p>
					<div className="mb-2">
						<h3 className="font-semibold">News:</h3>
						<ul className="list-disc pl-5">
							{project.news.map((item, index) => (
								<li key={index} className="text-gray-600">
									{item}
								</li>
							))}
						</ul>
					</div>
					<div className="mb-2">
						<h3 className="font-semibold">Issues:</h3>
						<ul className="list-disc pl-5">
							{project.issues.map((item, index) => (
								<li key={index} className="text-gray-600">
									{item}
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className="font-semibold">Pull Requests:</h3>
						<ul className="list-disc pl-5">
							{project.pullRequests.map((item, index) => (
								<li key={index} className="text-gray-600">
									{item}
								</li>
							))}
						</ul>
					</div>
					<Button className="mt-4">Repository</Button>
				</aside>
				<div className="flex space-x-2">
					<Button>Apply Now</Button>
					<Button>Save Project</Button>
				</div>
			</CardFooter> */}
		</Card>
	);
}
