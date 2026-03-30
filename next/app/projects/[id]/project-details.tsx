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
	project
}: {
	project: ProjectProps & any;
}) {
	return (
		<Card className="mx-auto my-8 max-w-[90%] rounded-lg bg-white shadow-lg">
			<CardHeader className="border-b p-6 pb-6">
				<CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
				<p className="text-gray-600">{project.description}</p>

				<div className="mt-4 flex flex-col gap-2">
					{project.difficulty && (
						<div className="font-semibold">
							Difficulty: <strong>{project.difficulty}</strong>
						</div>
					)}
					{project.githubLink && (
						<div>
							<a
								href={project.githubLink}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline"
							>
								GitHub Repository
							</a>
						</div>
					)}
				</div>

				{/* Owner and members */}
				<div className="mt-4 flex items-center gap-4">
					{project.owner ? (
						<Link href={routes.users.profile({ id: project.owner.id })}>
							<div className="flex items-center gap-3">
								<Avatar className="h-10 w-10">
									<AvatarImage src={project.owner.profilePicture || undefined} alt={project.owner.username} />
									<AvatarFallback className="text-sm">{project.owner.name?.[0]}</AvatarFallback>
								</Avatar>
								<div>
									<div className="text-sm font-semibold">{project.owner.name}</div>
									<div className="text-xs text-gray-500">Project Owner</div>
								</div>
							</div>
						</Link>
					) : null}

					{project.members && project.members.length > 0 ? (
						<div className="ml-4 flex items-center gap-2">
							{project.members.slice(0, 5).map((m: any) => (
								<Link key={m.id} href={routes.users.profile({ id: m.id })}>
									<Avatar className="h-8 w-8">
										<AvatarImage src={m.profilePicture || undefined} alt={m.username} />
										<AvatarFallback className="text-sm">{m.username?.[0]}</AvatarFallback>
									</Avatar>
								</Link>
							))}
							{project.members.length > 5 && <span className="text-sm text-gray-500">+{project.members.length - 5}</span>}
						</div>
					) : null}
				</div>
			</CardHeader>

			<CardContent className="p-6">
				{project.roles && project.roles.length > 0 ? (
					<section className="mb-6">
						<h2 className="mb-4 text-xl font-semibold">Looking for Help</h2>
						<div className="grid gap-4">
							{project.roles.map((role: any) => (
								<div key={role.id} className="rounded-lg border border-gray-200 p-4">
									<div className="flex items-start justify-between">
										<h3 className="mb-3 text-lg font-semibold">
											<Link href={`${routes.projects.project({ id: project.id })}/roles/${role.id}`}>{role.name}</Link>
										</h3>
										<Link href={`${routes.projects.project({ id: project.id })}/apply/${role.id}`}>
											<Button>Apply</Button>
										</Link>
									</div>

									<div className="mb-3 flex flex-col gap-2">
										<div>
											<strong className="text-sm text-gray-700">Required Skills:</strong>
											<div className="mt-1 flex flex-wrap gap-2">
												{role.requiredSkills.length > 0 ? (
													role.requiredSkills.map((skill: any) => (
														<Badge
															text={skill.name}
															key={skill.id}
															innerColor={skill.innerColor}
															outerColor={skill.outerColor}
															className={(skill.name || "").toLowerCase().includes("vs") || (skill.name || "").toLowerCase().includes("visual") ? "ring-2 ring-yellow-400" : ""}
														/>
													))
												) : (
													<span className="text-sm text-gray-500">None</span>
												)}
											</div>
										</div>

										<div>
											<strong className="text-sm text-gray-700">Optional Skills:</strong>
											<div className="mt-1 flex flex-wrap gap-2">
												{role.optionalSkills.length > 0 ? (
													role.optionalSkills.map((skill: any) => (
														<Badge
															text={skill.name}
															key={skill.id}
															innerColor={skill.innerColor}
															outerColor={skill.outerColor}
															className={(skill.name || "").toLowerCase().includes("vs") || (skill.name || "").toLowerCase().includes("visual") ? "ring-2 ring-yellow-400" : ""}
														/>
													))
												) : (
													<span className="text-sm text-gray-500">None</span>
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				) : null}
			</CardContent>
		</Card>
	);
}
