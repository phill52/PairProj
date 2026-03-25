"use client";
import { useState } from "react"; 
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Badge from "@/components/badge";
import Link from "next/link";
import { routes } from "@/routes/routes";

interface NewExperienceInput {
	employer: string;
	position: string;
	date: string;
	description: string;
 }

export function ViewProfile({ profile, isSelf }: { profile: any, isSelf: boolean; }) {
	const initials = profile.name
		?.split(" ")
		.map((n: string) => n[0])
		.join("")
		.toUpperCase();

	const skills = profile.skills ?? [];
	const education = profile.education ?? [];
	const [experience, setExperience] = useState(profile.experience ?? []);
	const [newExp, setNewExp] = useState<NewExperienceInput>({
		employer: "",
		position: "",
		date: "",
		description: "",
	  });
	const [showForm, setShowForm] = useState(false);
	const projectContributions = profile.projectContributions ?? [];
	  
	const handleAddExperience = async () => {
		try {
		  const createdExp = await addExperience(profile.id, newExp);
		  setExperience([...experience, createdExp]);
		  setShowForm(false);
		  setNewExp({ employer: "", position: "", date: "", description: "" });
		} catch (err) {
		  console.error(err);
		  alert("Failed to add experience");
		}
	  };

	return (
		<div>
			<Card className="mb-8 flex items-center space-x-8 space-y-1 p-4">
				<CardHeader>
					<Avatar className="mb-4 h-[10rem] w-[10rem] rounded-full p-2 shadow-md ring-gray-800">
						<AvatarImage src={profile.image} alt="User Image" />
						<AvatarFallback className="text-5xl">{initials}</AvatarFallback>
					</Avatar>
				</CardHeader>

				<CardContent className="w-full">
					<div className="flex w-full flex-col gap-4 lg:flex-row">
						<div className="flex w-full flex-col">
							<p className="text-4xl font-bold">{profile.name}</p>
							<p className="text-gray-500">{profile.email}</p>

							<div className="mt-3 text-lg font-bold">Skills</div>
							<div className="flex flex-wrap gap-2">
								{skills.map((s: any) => (
									<Badge
										key={s.skill.id}
										text={s.skill.name}
										innerColor={s.skill.innerColor}
										outerColor={s.skill.outerColor}
									/>
								))}
							</div>
						</div>

						<div className="flex w-full flex-col">
							<h2 className="text-4xl font-bold">Education</h2>
							{education.map((e: any) => (
								<div key={e.id}>
									<h3 className="text-2xl font-bold">{e.school}</h3>
									<p>{e.level}</p>
									<p>{e.date}</p>
									<p>{e.description}</p>
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="mb-4 p-4">
				<CardContent>
					<div className="flex w-full flex-row">
						<div className="flex-1 pr-4">
							<h3 className="mb-2 text-4xl font-bold">Experience</h3>
							{isSelf && (
							<div className="mb-4">
								<button
								onClick={() => setShowForm(!showForm)}
								className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
								>
								{showForm ? "Cancel" : "Add Experience"}
								</button>

								{showForm && (
								<div className="mt-4 flex flex-col gap-2">
									<input
									type="text"
									placeholder="Employer"
									value={newExp.employer}
									onChange={(e) =>
										setNewExp({ ...newExp, employer: e.target.value })
									}
									className="rounded border p-2"
									/>
									<input
									type="text"
									placeholder="Position"
									value={newExp.position}
									onChange={(e) =>
										setNewExp({ ...newExp, position: e.target.value })
									}
									className="rounded border p-2"
									/>
									<input
									type="text"
									placeholder="Date"
									value={newExp.date}
									onChange={(e) =>
										setNewExp({ ...newExp, date: e.target.value })
									}
									className="rounded border p-2"
									/>
									<textarea
									placeholder="Description"
									value={newExp.description}
									onChange={(e) =>
										setNewExp({ ...newExp, description: e.target.value })
									}
									className="rounded border p-2"
									/>
									<button
									onClick={handleAddExperience}
									className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
									>
									Save
									</button>
								</div>
								)}
							</div>
							)}

							{experience.map((exp: any) => (
								<div key={exp.id}>
									<h3 className="text-2xl font-bold">{exp.employer}</h3>
									<p>{exp.position}</p>
									<p>{exp.date}</p>
									<p>{exp.description}</p>
								</div>
							))}
						</div>

						<div className="flex-1 pl-4">
							<h3 className="mb-2 text-4xl font-bold">Past Projects</h3>
							{projectContributions.map((m: any) => {
								const project = m.project;
								return (
									<div
										key={project.id}
										className="mr-8 w-full rounded-lg border border-black p-6"
									>
										<Link
											href={routes.projects.project({ id: project.id })}
											className="group flex cursor-pointer flex-row"
										>
											<Image
												src={project.profile_picture}
												alt={project.name}
												width={100}
												height={100}
												className="mr-2 h-[7rem] w-[7rem] rounded-full object-cover"
											/>
											<div>
												<h3 className="text-2xl font-bold group-hover:underline">
													{project.name}
												</h3>
												<p>{project.description}</p>
											</div>
										</Link>
									</div>
								);
							})}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
