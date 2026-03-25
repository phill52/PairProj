"use client";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "./multi-select";
import { useFilters } from "../FiltersContext";
import { Button } from "@/components/ui/button";

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
	const { filtersSelected, setFiltersSelected, setQuery } = useFilters();

	const handleUnselect = (filterItem: string) => {
		setFiltersSelected(
			filtersSelected.filter((i) => i.value !== filterItem),
		);
	};

	return (
		<div className="space-y-4 bg-white p-4 shadow">
			<div className="flex items-center gap-4">
				<div className="max-w-lg flex-grow">
					<Input
						type="text"
						placeholder="Search projects..."
						onChange={(e) => setQuery(e.target.value)}
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
			</div>

			<div className="flex flex-wrap gap-1">
				{filtersSelected.map((item) => (
					<Badge
						variant="secondary"
						key={item.value}
						className="mb-1 mr-1"
					>
						{item.value}
						<Button
							className="ml-2 bg-transparent p-0 shadow-none hover:bg-transparent"
							onClick={() => handleUnselect(item.value)}
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