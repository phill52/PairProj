import React, { useState } from "react";
import Autocomplete from "@/components/autocomplete";
import Badge from "@/components/badge";
import type { Skill } from "../utils";
import type { Areas } from "../utils";
import { set } from "date-fns";

export function View4({ skills, areas }: { skills: Skill[]; areas: Areas[] }) {
	const [bestSkills, setBestSkills] = useState<Skill[]>([]);
	const [allSkills, setAllSkills] = useState<Skill[]>([]);
	const skillsList = skills.map((skill) => skill.name);
	const areasList = areas.map((area) => area.name);
	return (
		<div className="flex flex-col p-4 lg:px-40">
			<div className="flex flex-col space-y-4">
				<h1 className="text-4xl font-semibold">
					Select your best skills
				</h1>
				<Autocomplete
					options={skillsList}
					onSelect={(value) => {
						for (let skill of skills) {
							if (skill.name === value) {
								if (!bestSkills.includes(skill)) {
									setBestSkills([...bestSkills, skill]);
								} else {
									setBestSkills(
										bestSkills.filter((s) => s !== skill),
									);
								}
							}
						}
					}}
				/>
				{/* <Badge innerColor="FFD700" outerColor="FFD700" text="React"/> */}
				{bestSkills.length > 0 && (
					<div className="flex flex-wrap space-x-2">
						{bestSkills.map((skill) => (
							<Badge
								innerColor={skill.innerColor}
								outerColor={skill.outerColor}
								text={skill.name}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
