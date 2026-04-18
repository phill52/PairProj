import React, { useState } from "react";
import Autocomplete from "@/components/autocomplete";
import Badge from "@/components/badge";
import { Input, Textarea, Button } from "@/components/ui";

import { SubmitProjectDataAction } from "../create-project";
import { AreaTable } from "@/types/profile-items";
import { SubmitProject } from "@/types/projects";

export default function View1({
	State,
	OnUpdate,
	areas,
}: {
	State: SubmitProject;
	OnUpdate: React.Dispatch<SubmitProjectDataAction>;
	areas: AreaTable[];
}) {
	const [customArea, setCustomArea] = useState("");
	return (
		<div className="flex flex-col p-4 lg:px-40">
			<h3>Project Name</h3>
			<Input
				type="text"
				placeholder="Project Name"
				defaultValue={State.name}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					OnUpdate({
						type: "SET_NAME",
						payload: e.target.value,
					})
				}
			/>

			<h3 className="mt-4">Project Description</h3>
			<Textarea
				placeholder="Project Description"
				defaultValue={State.description}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
					OnUpdate({ type: "SET_DESCRIPTION", payload: e.target.value })
				}
			/>

			<h3 className="mt-4">Skill Level</h3>
			<select
				value={State.difficulty || ""}
				onChange={(e) =>
					OnUpdate({ type: "SET_SKILL_LEVEL", payload: e.target.value })
				}
				className="mb-4 w-full rounded border px-2 py-1"
			>
				<option value="">Select skill level (optional)</option>
				<option value="Beginner">Beginner</option>
				<option value="Intermediate">Intermediate</option>
				<option value="Advanced">Advanced</option>
			</select>

			<h3>GitHub Repository</h3>
			<Input
				type="text"
				placeholder="https://github.com/owner/repo"
				defaultValue={State.githubLink || ""}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					OnUpdate({ type: "SET_GITHUB", payload: e.target.value })
				}
			/>

			<h3 className="mt-4">Areas of Interest</h3>
			<Autocomplete
				options={areas.map((area) => area.name)}
				onSelect={(area) =>
					OnUpdate({
						type: "TOGGLE_AREA",
						payload: area,
					})
				}
			/>

			<div className="mt-2 flex items-center space-x-2">
				<Input
					className="w-full"
					type="text"
					placeholder="Add custom area"
					value={customArea}
					onChange={(e) => setCustomArea(e.target.value)}
				/>
				<Button
					variant="ghost"
					onClick={() => {
						if (customArea.trim()) {
							OnUpdate({ type: "TOGGLE_AREA", payload: customArea.trim() });
							setCustomArea("");
						}
					}}
				>
					Add
				</Button>
			</div>

			<div className="mt-2 flex flex-wrap space-x-2">
				{(State.areasOfInterest || []).map((area: string) => (
					<Badge
						key={area}
						innerColor="#000000"
						outerColor="#D9D9D9"
						text={area}
						onClick={() =>
							OnUpdate({
								type: "TOGGLE_AREA",
								payload: area,
							})
						}
					/>
				))}
			</div>
		</div>
	);
}
