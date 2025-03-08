import React, { useState } from "react";
import Autocomplete from "@/components/autocomplete";
import Badge from "@/components/badge";
import type { SkillTable, AreaTable } from "@/types/profile-items";
import { set } from "date-fns";
import { SubmitProfileDataAction } from "../create-profile";
import { SubmitProfile } from "@/types/profile-items";

type DataType = "BEST_SKILLS" | "ALL_SKILLS" | "AREAS";

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

	const { best_skills, all_skills, areas: existingAreas } = ExistingData;
	// const formattedBestSkills = best_skills
	// 	.map((skill) => skills.find((s) => s.name === skill))
	// 	.filter((skill): skill is Skill => skill !== undefined);
	const formattedBestSkills = best_skills
		.map((skill) => skills.find((s) => s.name === skill.name))
		.filter((skill): skill is SkillTable => skill !== undefined);
	// const formattedAllSkills = all_skills
	// 	.map((skill) => skills.find((s) => s.name === skill))
	// 	.filter((skill): skill is Skill => skill !== undefined);
	const formattedAllSkills = all_skills
		.map((skill) => skills.find((s) => s.name === skill.name))
		.filter((skill): skill is SkillTable => skill !== undefined);
	// const formattedAreas = existingAreas
	// 	.map((area) => areas.find((a) => a.name === area))
	// 	.filter((area): area is Areas => area !== undefined);
	const formattedAreas = existingAreas
		.map((area) => areas.find((a) => a.name === area.name))
		.filter((area): area is AreaTable => area !== undefined);

	const handleBestSkills = (skill: SkillTable) => {
		if (best_skills.includes(skill)) {
			OnUpdate({
				type: "SET_BEST_SKILLS",
				payload: best_skills.filter((s) => s !== skill),
			});
		} else {
			OnUpdate({
				type: "SET_BEST_SKILLS",
				payload: [...best_skills, skill],
			});
		}
	};

	const handleAllSkills = (skill: SkillTable) => {
		if (all_skills.includes(skill)) {
			OnUpdate({
				type: "SET_ALL_SKILLS",
				payload: all_skills.filter((s) => s !== skill),
			});
		} else {
			OnUpdate({
				type: "SET_ALL_SKILLS",
				payload: [...all_skills, skill],
			});
		}
	};

	const handleAreas = (area: AreaTable) => {
		if (existingAreas.includes(area)) {
			OnUpdate({
				type: "SET_AREAS",
				payload: existingAreas.filter((a) => a !== area),
			});
		} else {
			OnUpdate({
				type: "SET_AREAS",
				payload: [...existingAreas, area],
			});
		}
	};

	type ItemType = "SET_BEST_SKILLS" | "SET_ALL_SKILLS" | "SET_AREAS";
	type Item = SkillTable | AreaTable;

	return (
		<div className="flex flex-col p-4 lg:px-40">
			<div className="flex flex-col space-y-4">
				<h1 className="text-4xl font-semibold">
					Select your best skills
				</h1>
				<Autocomplete
					options={skillsList}
					onSelect={(value) => {
						const skill = skills.find((s) => s.name === value);
						if (skill) {
							handleBestSkills(skill);
						}
					}}
				/>
				{/* <Badge innerColor="FFD700" outerColor="FFD700" text="React"/> */}
				{formattedBestSkills.length > 0 && (
					<div className="flex flex-wrap space-x-2">
						{formattedBestSkills.map((skill) => (
							<Badge
								innerColor={skill.inner_color}
								outerColor={skill.outer_color}
								text={skill.name}
								key={skill.name}
								onClick={() => handleBestSkills(skill)}
							/>
						))}
					</div>
				)}
			</div>
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
								innerColor={skill.inner_color}
								outerColor={skill.outer_color}
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
								innerColor={area.inner_color}
								outerColor={area.outer_color}
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
