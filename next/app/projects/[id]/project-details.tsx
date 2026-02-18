"use client";
import React from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	Button,
	Avatar,
} from "@/components/ui";
import { ProjectProps } from "@/types/projects";
import Badge from "@/components/badge";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { routes } from "@/routes/routes";

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
				<div className="mt-4 flex flex-col gap-2">
					{project.skill_level && (
						<div className="font-semibold">
							Skill Level: <strong>{project.skill_level}</strong>
						</div>
					)}
					{project.github_repository && (
						<div>
							<a
								href={project.github_repository}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline"
							>
								GitHub Repository
							</a>
						</div>
					)}
				</div>
			</CardHeader>

			<CardContent className="p-6">
				<section className="mb-6">
					<h2 className="mb-4 text-xl font-semibold">
						Looking for Help
					</h2>
					<div className="grid gap-4">
						{project.roles.length > 0 ? (
							project.roles.map((role) => (
								<div
									key={role.id}
									className="rounded-lg border border-gray-200 p-4"
								>
									<h3 className="mb-3 text-lg font-semibold">
										{role.name}
									</h3>
									<div className="mb-3 flex flex-col gap-2">
										<div>
											<strong className="text-sm text-gray-700">
												All Skills:
											</strong>
											<div className="mt-1 flex flex-wrap gap-2">
												{role.skills.length > 0 ? (
													role.skills.map((skill) => (
														<Badge
															text={skill.name}
															key={skill.id}
															innerColor={
																skill.innerColor
															}
															outerColor={
																skill.outerColor
															}
														/>
													))
												) : (
													<span className="text-sm text-gray-500">
														No skills listed
													</span>
												)}
											</div>
										</div>
										<div>
											<strong className="text-sm text-gray-700">
												Required Skills:
											</strong>
											<div className="mt-1 flex flex-wrap gap-2">
												{role.skills.filter(
													(skill) =>
														skill.isRequired
												).length > 0 ? (
													role.skills
														.filter(
															(skill) =>
																skill.isRequired
														)
														.map((skill) => (
															<Badge
																text={
																	skill.name
																}
																key={skill.id}
																innerColor={
																	skill.innerColor
																}
																outerColor={
																	skill.outerColor
																}
															/>
														))
												) : (
													<span className="text-sm text-gray-500">
														None
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<p className="text-gray-500">
								No roles defined for this project
							</p>
						)}
					</div>
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
