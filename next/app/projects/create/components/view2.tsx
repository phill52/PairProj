import React, { useState } from "react";
import Autocomplete from "@/components/autocomplete";
import Badge from "@/components/badge";
import { Textarea, Input, Button } from "@/components/ui";

import { SkillTable, RoleTable } from "@/types/profile-items";
import { SubmitProjectDataAction } from "../create-project";

export default function View2({
	roles,
	skills,
	State,
	OnUpdate,
}: {
	roles: RoleTable[];
	skills: SkillTable[];
	State: any;
	OnUpdate: React.Dispatch<SubmitProjectDataAction>;
}) {
	const [skillInputs, setSkillInputs] = useState<Record<string, string>>({});
	const [reqSkillInputs, setReqSkillInputs] = useState<Record<string, string>>({});

	const setSkillInput = (role: string, value: string) =>
		setSkillInputs((s) => ({ ...s, [role]: value }));
	const setReqSkillInput = (role: string, value: string) =>
		setReqSkillInputs((s) => ({ ...s, [role]: value }));
	const [customRole, setCustomRole] = useState("");
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
				options={roles
						.filter((r) => r.name.toLowerCase() !== "owner")
						.map((role) => role.name)}
				onSelect={toggleRole}
			/>

			<div className="mt-2 flex items-center space-x-2">
				<Input
					className="w-full"
					type="text"
					placeholder="Add custom role"
					value={customRole}
					onChange={(e) => setCustomRole(e.target.value)}
				/>
				<Button
					variant="ghost"
					onClick={() => {
						if (customRole.trim()) {
							toggleRole(customRole.trim());
							setCustomRole("");
						}
					}}
				>
					Add
				</Button>
			</div>
			{Object.entries(State.roles)
				.filter(([roleName]) => roleName.toLowerCase() !== "owner")
				.map(([roleName, roleInfo]) => (
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
					<h4 className="mt-2 font-semibold">Optional Skills:</h4>
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
					<div className="mt-2 flex items-center space-x-2">
						<Input
							className="w-full"
							placeholder="Add custom skill"
							value={skillInputs[roleName] || ""}
							onChange={(e) => setSkillInput(roleName, e.target.value)}
						/>
						<Button
							variant="ghost"
							onClick={() => {
								const val = (skillInputs[roleName] || "").trim();
								if (!val) return;
								const customSkill = {
									name: val,
									inner_color: "#000000",
									outer_color: "#D9D9D9",
								} as SkillTable;
								toggleSkillForRole(roleName, customSkill, false);
								setSkillInput(roleName, "");
							}}
						>
							Add
						</Button>
					</div>
					<div className="mt-2 flex flex-wrap space-x-2">
						{roleInfo.skills.map((skill) => (
							<Badge
								innerColor={(skill as any).inner_color ?? (skill as any).innerColor}
								outerColor={(skill as any).outer_color ?? (skill as any).outerColor}
								text={(skill as any).name}
								key={(skill as any).name}
								onClick={() =>
									toggleSkillForRole(roleName, skill as SkillTable, false)
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
					<div className="mt-2 flex items-center space-x-2">
						<Input
							className="w-full"
							placeholder="Add required skill"
							value={reqSkillInputs[roleName] || ""}
							onChange={(e) => setReqSkillInput(roleName, e.target.value)}
						/>
						<Button
							variant="ghost"
							onClick={() => {
								const val = (reqSkillInputs[roleName] || "").trim();
								if (!val) return;
								const customSkill = {
									name: val,
									inner_color: "#000000",
									outer_color: "#D9D9D9",
								} as SkillTable;
								toggleSkillForRole(roleName, customSkill, true);
								setReqSkillInput(roleName, "");
							}}
						>
							Add
						</Button>
					</div>
					<div className="mt-2 flex flex-wrap space-x-2">
						{roleInfo.requiredSkills.map((skill) => (
							<Badge
								innerColor={(skill as any).inner_color ?? (skill as any).innerColor}
								outerColor={(skill as any).outer_color ?? (skill as any).outerColor}
								text={(skill as any).name}
								key={(skill as any).name}
								onClick={() =>
									toggleSkillForRole(roleName, skill as SkillTable, true)
								}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
