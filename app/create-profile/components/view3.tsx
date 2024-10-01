import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { SubmitProfileDataAction } from "../create-profile";
import { RoleTable } from "@/types";

export function View3({
	AccountTypes,
	ExistingTypes,
	OnUpdate,
}: {
	AccountTypes: RoleTable[];
	ExistingTypes: RoleTable[];
	OnUpdate: React.Dispatch<SubmitProfileDataAction>;
}) {
	// Create a state to keep track of checked items
	const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

	// const toggleCheckbox = (type: string) => {
	// 	setCheckedItems((prevCheckedItems) => {
	// 		const newCheckedItems = new Set(prevCheckedItems);
	// 		if (newCheckedItems.has(type)) {
	// 			newCheckedItems.delete(type);
	// 		} else {
	// 			newCheckedItems.add(type);
	// 		}
	// 		return newCheckedItems;
	// 	});
	// };

	const toggleCheckbox = (type: RoleTable) => {
		// OnUpdate({
		// 	type: "SET_ACCOUNT_TYPE",
		// 	payload: ExistingTypes.includes(type)
		// 		? ExistingTypes.filter((t) => t !== type)
		// 		: [...ExistingTypes, type],
		// });
		OnUpdate({
			type: "SET_ROLES",
			payload: ExistingTypes.includes(type)
				? ExistingTypes.filter((t) => t !== type)
				: [...ExistingTypes, type],
		});
	};

	const hasRole = (role: RoleTable) =>
		ExistingTypes.find((r) => r.name === role.name) !== undefined;

	return (
		<div className="flex flex-col p-4 lg:px-40">
			<h1 className="mb-4 text-4xl font-semibold">Are you a</h1>
			<div className="space-y-2">
				{AccountTypes.map((type) => (
					<label
						key={type.name}
						className="flex items-center space-x-3"
					>
						<Checkbox
							checked={hasRole(type)}
							onClick={() => toggleCheckbox(type)}
						/>
						<span className="text-gray-600">{type.name}</span>
					</label>
				))}
			</div>
		</div>
	);
}
