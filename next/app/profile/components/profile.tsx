"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ViewProfileProps } from "@/types";
import Badge from "@/components/badge";
import dateToMonthYear from "@/utils/dateHelpers";
import Link from "next/link";
import { routes } from "@/routes/routes";

export function ViewProfile({ profile }: { profile: ViewProfileProps }) {
	return (
		<div>
			<Card className="mb-8 flex items-center space-x-8 space-y-1 p-4">
				<CardHeader>
					<Avatar className="w-25 mb-4 h-[10rem] w-[10rem] rounded-full p-2 shadow-md ring-gray-800">
						<AvatarImage
							src={profile.avatar_location}
							alt="User Image"
						/>
						<AvatarFallback className=" text-5xl">
							{profile?.first_name[0]}
							{profile?.last_name[0]}
						</AvatarFallback>
					</Avatar>
				</CardHeader>
				<CardContent className="gap- grid w-full">
					<div className="flex w-full flex-col gap-2 lg:flex-row">
						<div className="flex w-full flex-col items-start justify-center">
							{profile.first_name ? (
								<div>
									<p className="text-4xl font-bold">
										{profile.first_name} {profile.last_name}
									</p>
									<p className="text-gray-500">
										{profile.username}
									</p>
								</div>
							) : (
								<p className="text-4xl font-bold">
									{profile.username}
								</p>
							)}
							<div className=" flex items-center gap-2 text-lg">
								{profile.role}{" "}
								<div className="rounded-full bg-green-400 p-2 text-white">
									{profile.skill_level}
								</div>
							</div>
							<div
								style={{ fontSize: "1.4rem" }}
								className="text-lg font-bold"
							>
								Best Skills:
							</div>
							<div className="flex flex-wrap gap-2">
								{profile.best_skills.map((item, index) => (
									<Badge
										innerColor={item.innerColor}
										outerColor={item.outerColor}
										text={item.name}
										key={item.name}
									/>
								))}
							</div>
							<div
								style={{ fontSize: "1.4rem" }}
								className="text-lg font-bold"
							>
								Skills:
							</div>
							<div className="flex max-w-md flex-wrap gap-2">
								{profile.all_skills.map((item, index) => (
									<Badge
										innerColor={item.innerColor}
										outerColor={item.outerColor}
										text={item.name}
										key={item.name}
									/>
								))}
							</div>
						</div>
						<div className="flex w-full flex-col">
							<h2 className="mb-0 w-full text-4xl font-bold">
								Education
							</h2>
							{profile.education.map((item) => (
								<div key={`education-at-${item.school}`}>
									<h3 className="mb-0 text-2xl font-bold">
										{item.school}
									</h3>
									<p className="text-md">
										{item.degree}, {item.field}
									</p>
									<p className="flex flex-col justify-start">
										{dateToMonthYear(item.startDate)}-
										{dateToMonthYear(item.endDate)}
									</p>
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="mb-4 flex items-center space-y-1 p-4 ">
				<CardContent>
					<div className="flex w-full flex-row">
						<div className="flex-1  pr-4">
							<div className="mb-2">
								<h3 className="mb-2 text-4xl font-bold ">
									About
								</h3>
								<p className="flex items-center ">
									{profile.bio}
								</p>
							</div>
							<div>
								<h3 className="mb-2 text-4xl font-bold">
									Experience
								</h3>
								{profile.experience.map((item, index) => (
									<div key={index}>
										<h3 className="mb-0 text-2xl font-bold">
											{item.company}
										</h3>
										<p className="text-md mb-0">
											{item.position},{" "}
											{dateToMonthYear(item.startDate)}-
											{dateToMonthYear(item.endDate)}
										</p>
										<p className="text-md mb-0">
											{item.description}
										</p>
									</div>
								))}
							</div>
						</div>
						<div className="flex-1 pl-4">
							<h3 className="mb-2 text-4xl font-bold">
								Past Projects
							</h3>
							{profile.past_projects.map((project, index) => (
								<div
									key={`project-${index}`}
									className="mr-8 w-full rounded-lg border border-black p-6"
								>
									<Link
										href={routes.projects.project({
											id: project.id,
										})}
										className="group flex cursor-pointer flex-row"
									>
										<Image
											src={project.picture}
											alt={project.name}
											width={100}
											height={100}
											className="mr-2 h-[7rem] w-[7rem] overflow-hidden rounded-full object-cover object-center"
										/>
										<div>
											<h3 className="text-2xl font-bold group-hover:underline">
												{project.name}
											</h3>
											<p className="text-md">
												{project.description}
											</p>
											<div className="flex flex-wrap gap-2">
												{project.skills.map((skill) => (
													<Badge
														innerColor={
															skill.innerColor
														}
														outerColor={
															skill.outerColor
														}
														text={skill.name}
														key={skill.name}
													/>
												))}
											</div>
										</div>
									</Link>
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
