import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export function View3({ AccountTypes }: { AccountTypes: string[] }) {
	// Create a state to keep track of checked items
	const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

	const toggleCheckbox = (type: string) => {
		setCheckedItems((prevCheckedItems) => {
			const newCheckedItems = new Set(prevCheckedItems);
			if (newCheckedItems.has(type)) {
				newCheckedItems.delete(type);
			} else {
				newCheckedItems.add(type);
			}
			return newCheckedItems;
		});
	};

	return (
		<div className="flex flex-col p-4 lg:px-40">
			<h1 className="mb-4 text-4xl font-semibold">Are you a</h1>
			<div className="space-y-2">
				{AccountTypes.map((type) => (
					<label key={type} className="flex items-center space-x-3">
						<Checkbox
							checked={checkedItems.has(type)}
							onClick={() => toggleCheckbox(type)}
						/>
						<span className="text-gray-600">{type}</span>
					</label>
				))}
			</div>
		</div>
	);
}
