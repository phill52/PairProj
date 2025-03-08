import Autocomplete from "@/components/autocomplete";
import Badge from "@/components/badge";
import { Textarea } from "@/components/ui/textarea.tsx";

import { SubmitProject } from "@/types/projects.ts";
import { SkillTable, RoleTable, Skill } from "@/types/profile-items.ts";
import { SubmitProjectDataAction } from "../create-project.tsx";

export default function View2({
	roles,
	skills,
	State,
	OnUpdate,
}: {
	roles: RoleTable[];
	skills: SkillTable[];
	State: SubmitProject;
	OnUpdate: React.Dispatch<SubmitProjectDataAction>;
}) {
	const toggleRole = (role: string) => {
		OnUpdate({
			type: "TOGGLE_ROLE",
			payload: role,
		});
	};

	const addRoleDescription = (role: string, description: string) => {
		OnUpdate({
			type: "SET_ROLE_DESCRIPTION",
			payload: { roleName: role, description: description },
		});
	};

	const toggleSkillForRole = (
		roleName: string,
		skill: SkillTable,
		isRequired: boolean,
	) => {
		OnUpdate({
			type: "TOGGLE_SKILL_FOR_ROLE",
			payload: { roleName, skill, isRequired },
		});
	};

	return (
		<div className="flex flex-col p-4 lg:px-40">
			<h1 className="text-lg">Roles needed</h1>
			<Autocomplete
				options={roles.map((role) => role.name)}
				onSelect={toggleRole}
			/>
			{Object.entries(State.roles).map(([roleName, roleInfo]) => (
				<div key={roleName} className="mt-4">
					<h3 className="text-xl font-bold">{roleName}</h3>
					<Textarea
						placeholder="Enter Role Description"
						value={roleInfo.description || ""}
						onChange={(e) =>
							OnUpdate({
								type: "SET_ROLE_DESCRIPTION",
								payload: {
									roleName,
									description: e.target.value,
								},
							})
						}
					/>
					<h4 className="mt-2 font-semibold">Skills:</h4>
					<Autocomplete
						options={skills.map((skill) => skill.name)}
						onSelect={(value) => {
							const skill = skills.find((s) => s.name === value);
							if (skill) {
								OnUpdate({
									type: "TOGGLE_SKILL_FOR_ROLE",
									payload: {
										roleName,
										skill,
										isRequired: false,
									},
								});
							}
						}}
					/>
					<div className="mt-2 flex flex-wrap space-x-2">
						{roleInfo.skills.map((skill) => (
							<Badge
								innerColor={skill.inner_color}
								outerColor={skill.outer_color}
								text={skill.name}
								key={skill.name}
								onClick={() =>
									toggleSkillForRole(roleName, skill, false)
								}
							/>
						))}
					</div>
					<h4 className="mt-4 font-semibold">Required Skills:</h4>
					<Autocomplete
						options={skills.map((skill) => skill.name)}
						onSelect={(value) => {
							const skill = skills.find((s) => s.name === value);
							if (skill) {
								toggleSkillForRole(roleName, skill, true);
							}
						}}
					/>
					<div className="mt-2 flex flex-wrap space-x-2">
						{roleInfo.requiredSkills.map((skill) => (
							<Badge
								innerColor={skill.inner_color}
								outerColor={skill.outer_color}
								text={skill.name}
								key={skill.name}
								onClick={() =>
									toggleSkillForRole(roleName, skill, true)
								}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
