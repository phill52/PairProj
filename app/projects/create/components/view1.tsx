import Autocomplete from "@/components/autocomplete";
import Badge from "@/components/badge";
import { Input } from "@/components/ui";
import { Textarea } from "@/components/ui";

import { SubmitProject } from "@/types/projects.ts";
import { SubmitProjectDataAction } from "../create-project.tsx";
import { AreaTable } from "@/types/profile-items.ts";

export default function View1({
	State,
	OnUpdate,
	areas,
}: {
	State: SubmitProject;
	OnUpdate: React.Dispatch<SubmitProjectDataAction>;
	areas: AreaTable[];
}) {
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
			<h3>Project Description</h3>
			<Textarea
				placeholder="Project Description"
				defaultValue={State.description}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
					OnUpdate({
						type: "SET_NAME",
						payload: e.target.value,
					})
				}
			/>
			<h3>Areas of Interest</h3>
			<Autocomplete
				options={areas.map((area) => area.name)}
				onSelect={(area) =>
					OnUpdate({
						type: "TOGGLE_AREA",
						payload: area,
					})
				}
			/>
			<div className="mt-2 flex flex-wrap space-x-2">
				{State.areasOfInterest.map((area) => (
					<Badge
						innerColor={area.inner_color}
						outerColor={area.outer_color}
						key={area.name}
						text={area.name}
						onClick={() =>
							OnUpdate({
								type: "TOGGLE_AREA",
								payload: area.name,
							})
						}
					/>
				))}
			</div>
		</div>
	);
}
