"use client";
import { useState } from "react"; 
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Badge from "@/components/badge";
import Link from "next/link";
import { routes } from "@/routes/routes";
import { addSkill, addExperience, addEducation } from "@/app/actions/users";

interface NewExperienceInput {
	employer: string;
	position: string;
	startDate: string,
	endDate: string,
	description: string;
}
interface NewEducationInput {
	school: string;
	level: string;
	startDate: string,
	endDate: string,
	description: string;
}
interface NewSkillInput {
	skill: string;
	skillLevel: string;
}

export function ViewProfile({ profile, isSelf }: { profile: any, isSelf: boolean; }) {
	const initials = profile.name
		?.split(" ")
		.map((n: string) => n[0])
		.join("")
		.toUpperCase();

	const experience = profile.experience ?? [];
	const [newExp, setNewExp] = useState<NewExperienceInput>({
		employer: "",
		position: "",
		startDate: "",
		endDate: "",
		description: "",
	  });
	const [newEdu, setNewEdu] = useState<NewEducationInput>({
		school: "",
		level: "",
		startDate: "",
		endDate: "",
		description: ""
	});
	const [showForm, setShowForm] = useState(false);
	const projectContributions = profile.projectContributions ?? [];
	const [showEduForm, setShowEduForm] = useState(false);
	const [showSkillForm, setShowSkillForm] = useState(false);

	const education = profile.education ?? [];
	const skills = profile.skills ?? [];

	const [newSkill, setNewSkill] = useState({
		name: "",
		skillLevel: "",
	});
	
	const handleAddSkill = async () => {
		try {
		  const formData = new FormData();
		  formData.append("skill", newSkill.name);
		  formData.append("skillLevel", newSkill.skillLevel);
	  
		  await addSkill(profile.id, formData);
	  
		  setShowSkillForm(false);
		  setNewSkill({ name: "", skillLevel: "" });
		} catch (e) {
		  alert("Failed to add skill");
		}
	  };

	  const handleAddExperience = async () => {
		try {
			const formData = new FormData();
	  
			formData.append("employer", newExp.employer);
			formData.append("position", newExp.position);
			formData.append("description", newExp.description);
			formData.append("startDate", newExp.startDate);
			formData.append("endDate", newExp.endDate);
		
			await addExperience(profile.id, formData);
		
			setShowForm(false);
			setNewExp({
				employer: "",
				position: "",
				startDate: "",
				endDate: "",
				description: "",
		  	});
		} catch (e) {
			alert("Failed to add experience");
		}
	  };
	const handleAddEducation = async () => {
		try {
		  const formData = new FormData();
	  
		  formData.append("school", newEdu.school);
		  formData.append("level", newEdu.level);
		  formData.append("startDate", newEdu.startDate);
		  formData.append("endDate", newEdu.endDate);
		  formData.append("description", newEdu.description);
	  
		  await addEducation(profile.id, formData);
	  
		  setShowEduForm(false);
		  setNewEdu({
			school: "",
			level: "",
			startDate: "",
			endDate: "",
			description: "",
		  });
		} catch (e) {
		  alert("Failed to add education");
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

							{isSelf && (
							<div className="mb-2">
							<button
								onClick={() => setShowSkillForm(!showSkillForm)}
								className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
							>
								{showSkillForm ? "Cancel" : "Add Skill"}
							</button>

								{showSkillForm && (
									<div className="mt-2 flex flex-col gap-2">
									<input
										type="text"
										placeholder="Skill (e.g. React)"
										value={newSkill.name}
										onChange={(e) =>
										setNewSkill({ ...newSkill, name: e.target.value })
										}
										className="rounded border p-2"
									/>
									<input
										type="text"
										placeholder="Level (e.g. Beginner, Advanced)"
										value={newSkill.skillLevel}
										onChange={(e) =>
										setNewSkill({ ...newSkill, skillLevel: e.target.value })
										}
										className="rounded border p-2"
									/>
									<button
										onClick={handleAddSkill}
										className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
									>
										Save
									</button>
									</div>
								)}

							</div>
							)}

							<div className="flex flex-wrap gap-2">
							{skills.map((s: any) => (
							<Badge
								key={s.id ?? s.skillId}
								text={s.skill?.name}
								innerColor={s.skill?.innerColor}
								outerColor={s.skill?.outerColor}
							/>
							))}
							</div>
						</div>

						<div className="flex w-full flex-col">
						<h2 className="text-4xl font-bold">Education</h2>
							{isSelf && (
							<div className="mb-4">
								<button
								onClick={() => setShowEduForm(!showEduForm)}
								className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
								>
								{showEduForm ? "Cancel" : "Add Education"}
								</button>

								{showEduForm && (
								<div className="mt-4 flex flex-col gap-2">
									<input
									type="text"
									placeholder="School"
									value={newEdu.school}
									onChange={(e) =>
										setNewEdu({ ...newEdu, school: e.target.value })
									}
									className="rounded border p-2"
									/>
									<input
									type="text"
									placeholder="Level"
									value={newEdu.level}
									onChange={(e) =>
										setNewEdu({ ...newEdu, level: e.target.value })
									}
									className="rounded border p-2"
									/>
									<input
									type="date"
									placeholder="Start Date"
									value={newEdu.startDate}
									onChange={(e) =>
										setNewEdu({ ...newEdu, startDate: e.target.value })
									}
									className="rounded border p-2"
									/>
									<input
									type="date"
									placeholder="End Date"
									value={newEdu.endDate}
									onChange={(e) =>
										setNewEdu({ ...newEdu, endDate: e.target.value })
									}
									className="rounded border p-2"
									/>
									<textarea
									placeholder="Description"
									value={newEdu.description}
									onChange={(e) =>
										setNewEdu({ ...newEdu, description: e.target.value })
									}
									className="rounded border p-2"
									/>
									<button
									onClick={handleAddEducation}
									className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
									>
									Save
									</button>
								</div>
								)}
							</div>
							)}

							{education.map((e: any) => (
							<div key={e.id}>
								<h3 className="text-2xl font-bold">{e.school}</h3>
								<p>{e.level}</p>
								<p>{new Date(e.startDate).toLocaleDateString()}</p>
								<p>{e.endDate ? new Date(e.endDate).toLocaleDateString() : "Present"}</p>
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
									type="date"
									placeholder="Start Date"
									value={newExp.startDate}
									onChange={(e) =>
										setNewExp({ ...newExp, startDate: e.target.value })
									}
									className="rounded border p-2"
									/>
									<input
									type="date"
									placeholder="End Date"
									value={newExp.endDate}
									onChange={(e) =>
										setNewExp({ ...newExp, endDate: e.target.value })
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
									<p>{new Date(exp.startDate).toLocaleDateString()}</p>
									<p>{exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}</p>
									<p>{exp.description}</p>
								</div>
							))}
						</div>

						<div className="flex-1 pl-4">
							<h3 className="mb-2 text-4xl font-bold">Projects</h3>
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
