"use client";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "./multi-select";
import { useFilters } from "../FiltersContext";
import { FilterObject } from "../FiltersContext";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";


const skills = [
	{ value: "C", label: "C" },
	{ value: "C#", label: "C#" },
	{ value: "C++", label: "C++" },
	{ value: "CSS", label: "CSS" },
	{ value: "Dart", label: "Dart" },
	{ value: "Docker", label: "Docker" },
	{ value: "Golang", label: "Golang" },
	{ value: "HTML", label: "HTML" },
	{ value: "Java", label: "Java" },
	{ value: "JavaScript", label: "JavaScript" },
	{ value: "Latex", label: "Latex" },
	{ value: "Machine Learning", label: "Machine Learning" },
	{ value: "Node", label: "Node" },
	{ value: "Python", label: "Python" },
	{ value: "React", label: "React" },
	{ value: "Ruby", label: "Ruby" },
	{ value: "Rust", label: "Rust" },
	{ value: "Swift", label: "Swift" },
	{ value: "TypeScript", label: "TypeScript" },
	{ value: "Vue", label: "Vue" },
];

const difficulties = [
	{ value: "Beginner", label: "Beginner" },
	{ value: "Intermediate", label: "Intermediate" },
	{ value: "Advanced", label: "Advanced" },
];

const FilterBar = () => {
	const { filtersSelected, setFiltersSelected } = useFilters();
	const router = useRouter();
	const pathname = usePathname();

	const [localQuery, setLocalQuery] = useState("");

	const applyFilters = (filters: FilterObject[], query?: string) => {
	const params = new URLSearchParams();

	const skills = filters
		.filter((f) => f.label === "skills")
		.map((f) => f.value);

	if (skills.length > 0) {
		params.set("skills", skills.join(","));
	}

	const difficulty = filters.find((f) => f.label === "difficulty");
	if (difficulty) {
		params.set("difficulty", difficulty.value);
	}

	if (query) {
		params.set("query", query);
	}

	router.push(`${pathname}?${params.toString()}`);
};

	const handleUnselect = (filterItem: string) => {
		setFiltersSelected(
			filtersSelected.filter((i) => i.value !== filterItem)
		);
	};

	return (
		<div className="space-y-4 bg-white p-4 shadow">
			<div className="flex items-center gap-4">
				<div className="max-w-lg flex-grow">
					<Input
						type="text"
						placeholder="Search projects..."
						onChange={(e) => setLocalQuery(e.target.value)}
					/>
				</div>

				<MultiSelect
					options={skills}
					selected={filtersSelected}
					onChange={setFiltersSelected}
					name="Skills"
					label="skills"
				/>

				<MultiSelect
					options={difficulties}
					selected={filtersSelected}
					onChange={setFiltersSelected}
					name="Difficulty"
					label="difficulty"
				/>

				<Button
					onClick={() =>
						applyFilters(filtersSelected, localQuery)
					}
				>
					Search
				</Button>
			</div>

			<div className="flex flex-wrap gap-1">
				{filtersSelected.map((item) => (
					<Badge key={item.value} variant="secondary">
						{item.value}
						<Button
							className="ml-2 bg-transparent p-0 shadow-none hover:bg-transparent"
							onClick={() =>
								setFiltersSelected(
									filtersSelected.filter(
										(i) => i.value !== item.value
									)
								)
							}
						>
							x
						</Button>
					</Badge>
				))}
			</div>
		</div>
	);
};

export default FilterBar;