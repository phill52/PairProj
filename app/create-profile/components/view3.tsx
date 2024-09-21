import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { SubmitProfileDataAction } from "../page";

export function View3({
	AccountTypes,
	ExistingTypes,
	OnUpdate,
}: {
	AccountTypes: string[];
	ExistingTypes: string[];
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

	const toggleCheckbox = (type: string) => {
		OnUpdate({
			type: "SET_ACCOUNT_TYPE",
			payload: ExistingTypes.includes(type)
				? ExistingTypes.filter((t) => t !== type)
				: [...ExistingTypes, type],
		});
	};

	return (
		<div className="flex flex-col p-4 lg:px-40">
			<h1 className="mb-4 text-4xl font-semibold">Are you a</h1>
			<div className="space-y-2">
				{AccountTypes.map((type) => (
					<label key={type} className="flex items-center space-x-3">
						<Checkbox
							checked={ExistingTypes.includes(type)}
							onClick={() => toggleCheckbox(type)}
						/>
						<span className="text-gray-600">{type}</span>
					</label>
				))}
			</div>
		</div>
	);
}
