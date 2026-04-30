import React, { useState } from "react";
import Autocomplete from "@/components/autocomplete";
import Badge from "@/components/badge";
import type { SkillTable, AreaTable } from "@/types/profile-items";
import { SubmitProfileDataAction } from "../create-profile";
import { SubmitProfile } from "@/types/profile-items";

type DataType = "BEST_SKILLS" | "ALL_SKILLS" | "AREAS";

interface View4Props {
	skills: SkillTable[];
	areas: AreaTable[];
	ExistingData: SubmitProfile;
	OnUpdate: React.Dispatch<SubmitProfileDataAction>;
}

export function View4({
	skills,
	areas,
	ExistingData,
	OnUpdate,
}: {
	skills: SkillTable[];
	areas: AreaTable[];
	ExistingData: SubmitProfile;
	OnUpdate: React.Dispatch<SubmitProfileDataAction>;
}) {
	const skillsList = skills.map((skill) => skill.name);
	const areasList = areas.map((area) => area.name);

	const { skills: all_skills, areasOfInterest: existingAreas } = ExistingData;


	const formattedAllSkills: SkillTable[] = all_skills
		.map(
			(skill: SkillTable): SkillTable | undefined =>
				skills.find((s: SkillTable) => s.id === skill.skillId)
		)
		.filter(
			(skill: SkillTable | undefined): skill is SkillTable => skill !== undefined
		);
	// const formattedAreas = existingAreas
	// 	.map((area) => areas.find((a) => a.name === area))
	// 	.filter((area): area is Areas => area !== undefined);
	const formattedAreas = existingAreas
		.map((area) => areas.find((a) => a.name === area))
		.filter((area): area is AreaTable => area !== undefined);


	const handleAllSkills = (skill: SkillTable) => {
		if (all_skills.some((selectedSkill) => selectedSkill.skillId === skill.id)) {
			OnUpdate({
				type: "SET_ALL_SKILLS",
				payload: all_skills.filter((selectedSkill) => selectedSkill.skillId !== skill.id),
			});
		} else {
			OnUpdate({
				type: "SET_ALL_SKILLS",
				payload: [...all_skills, { skillId: skill.id, skillLevel: "" }],
			});
		}
	};

	const handleAreas = (area: AreaTable) => {
		if (existingAreas.some((selectedArea) => selectedArea === area.name)) {
			OnUpdate({
				type: "SET_AREAS",
				payload: existingAreas.filter((selectedArea) => selectedArea !== area.name),
			});
		} else {
			OnUpdate({
				type: "SET_AREAS",
				payload: [...existingAreas, area.name],
			});
		}
	};


	return (
		<div className="flex flex-col p-4 lg:px-40">
			<div className="flex flex-col space-y-4">
				<h1 className="text-4xl font-semibold">
					Select all your skills
				</h1>
				<Autocomplete
					options={skillsList}
					onSelect={(value) => {
						const skill = skills.find((s) => s.name === value);
						if (skill) {
							handleAllSkills(skill);
						}
					}}
				/>
				{formattedAllSkills.length > 0 && (
					<div className="flex flex-wrap space-x-2">
						{formattedAllSkills.map((skill) => (
							<Badge
									innerColor={skill.innerColor}
									outerColor={skill.outerColor}
								text={skill.name}
								key={skill.name}
								onClick={() => handleAllSkills(skill)}
							/>
						))}
					</div>
				)}
			</div>
			<div className="flex flex-col space-y-4">
				<h1 className="text-4xl font-semibold">
					Select your areas of interest
				</h1>
				<Autocomplete
					options={areasList}
					onSelect={(value) => {
						const area = areas.find((a) => a.name === value);
						if (area) {
							handleAreas(area);
						}
					}}
				/>
				{formattedAreas.length > 0 && (
					<div className="flex flex-wrap space-x-2">
						{formattedAreas.map((area) => (
							<Badge
									innerColor={area.innerColor}
									outerColor={area.outerColor}
								text={area.name}
								key={area.name}
								onClick={() => handleAreas(area)}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
