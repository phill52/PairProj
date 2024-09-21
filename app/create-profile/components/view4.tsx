import React, { useState } from "react";
import Autocomplete from "@/components/autocomplete";
import Badge from "@/components/badge";
import type { Skill } from "../utils";
import type { Areas } from "../utils";
import { set } from "date-fns";
import { SubmitProfileDataAction } from "../page";
import { SubmitProfileDataState } from "../utils";

type DataType = "BEST_SKILLS" | "ALL_SKILLS" | "AREAS";

export function View4({
	skills,
	areas,
	ExistingData,
	OnUpdate,
}: {
	skills: Skill[];
	areas: Areas[];
	ExistingData: SubmitProfileDataState;
	OnUpdate: React.Dispatch<SubmitProfileDataAction>;
}) {
	const skillsList = skills.map((skill) => skill.name);
	const areasList = areas.map((area) => area.name);

	const { bestSkills, allSkills, areas: existingAreas } = ExistingData;
	const formattedBestSkills = bestSkills
		.map((skill) => skills.find((s) => s.name === skill))
		.filter((skill): skill is Skill => skill !== undefined);
	const formmatedAllSkills = allSkills
		.map((skill) => skills.find((s) => s.name === skill))
		.filter((skill): skill is Skill => skill !== undefined);
	const formattedAreas = existingAreas
		.map((area) => areas.find((a) => a.name === area))
		.filter((area): area is Areas => area !== undefined);

	const addOrRemoveItem = (type: DataType, item: string) => {
		let actionType: SubmitProfileDataAction["type"];
		let currentItems: string[];

		switch (type) {
			case "BEST_SKILLS":
				actionType = "SET_BEST_SKILLS";
				currentItems = ExistingData.bestSkills;
				break;
			case "ALL_SKILLS":
				actionType = "SET_ALL_SKILLS";
				currentItems = ExistingData.allSkills;
				break;
			case "AREAS":
				actionType = "SET_AREAS";
				currentItems = ExistingData.areas;
				break;
			default:
				throw new Error(`Unsupported type: ${type}`);
		}

		const updatedItems = currentItems.includes(item)
			? currentItems.filter((i) => i !== item)
			: [...currentItems, item];

		OnUpdate({
			type: actionType,
			payload: updatedItems,
		});
	};

	return (
		<div className="flex flex-col p-4 lg:px-40">
			<div className="flex flex-col space-y-4">
				<h1 className="text-4xl font-semibold">
					Select your best skills
				</h1>
				<Autocomplete
					options={skillsList}
					// onSelect={(value) => {
					// 	for (let skill of skills) {
					// 		if (skill.name === value) {
					// 			if (!bestSkills.includes(skill)) {
					// 				setBestSkills([...bestSkills, skill]);
					// 			} else {
					// 				setBestSkills(
					// 					bestSkills.filter((s) => s !== skill),
					// 				);
					// 			}
					// 		}
					// 	}
					// }}
					onSelect={(value) => {
						addOrRemoveItem("BEST_SKILLS", value);
					}}
				/>
				{/* <Badge innerColor="FFD700" outerColor="FFD700" text="React"/> */}
				{formattedBestSkills.length > 0 && (
					<div className="flex flex-wrap space-x-2">
						{formattedBestSkills.map((skill) => (
							<Badge
								innerColor={skill.innerColor}
								outerColor={skill.outerColor}
								text={skill.name}
								key={skill.name}
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
						addOrRemoveItem("ALL_SKILLS", value);
					}}
				/>
				{formmatedAllSkills.length > 0 && (
					<div className="flex flex-wrap space-x-2">
						{formmatedAllSkills.map((skill) => (
							<Badge
								innerColor={skill.innerColor}
								outerColor={skill.outerColor}
								text={skill.name}
								key={skill.name}
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
						addOrRemoveItem("AREAS", value);
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
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
