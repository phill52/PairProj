"use client";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "./multi-select";
import { useFilters } from "../FiltersContext";
import { FilterObject } from "../FiltersContext";
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

const availability = [
	{ value: "open", label: "Open" },
	{ value: "closed", label: "Closed" },
];

const teamSizes = [
	{ value: "small", label: "1-3" },
	{ value: "medium", label: "4-10" },
	{ value: "large", label: "10+" },
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

		const status = filters.find((f) => f.label === "availability");
		if (status) {
			params.set("status", status.value);
		}

		const team = filters.find((f) => f.label === "team");
		if (team) {
			params.set("team", team.value);
		}

		if (query) {
			params.set("query", query);
		}

		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<div className="space-y-4 bg-white p-4 shadow">
			<div className="flex items-center gap-4">
				<div className="max-w-lg flex-grow">
					<Input
						type="text"
						placeholder="Search projects..."
						onChange={(e) => {
							const value = e.target.value;
							setLocalQuery(value);
							applyFilters(filtersSelected, value);
						}}
					/>
				</div>

				<MultiSelect
					options={skills}
					selected={filtersSelected}
					onChange={(newFilters) => {
						const updated =
							typeof newFilters === "function"
								? newFilters(filtersSelected)
								: newFilters;

						setFiltersSelected(updated);
						applyFilters(updated, localQuery);
					}}
					name="Skills"
					label="skills"
				/>

				<MultiSelect
					options={difficulties}
					selected={filtersSelected}
					onChange={(newFilters) => {
						const updated =
							typeof newFilters === "function"
								? newFilters(filtersSelected)
								: newFilters;

						setFiltersSelected(updated);
						applyFilters(updated, localQuery);
					}}
					name="Difficulty"
					label="difficulty"
				/>

				<MultiSelect
					options={availability}
					selected={filtersSelected}
					onChange={(newFilters) => {
						const updated =
							typeof newFilters === "function"
								? newFilters(filtersSelected)
								: newFilters;

						setFiltersSelected(updated);
						applyFilters(updated, localQuery);
					}}
					name="Status"
					label="availability"
				/>

				<MultiSelect
					options={teamSizes}
					selected={filtersSelected}
					onChange={(newFilters) => {
						const updated =
							typeof newFilters === "function"
								? newFilters(filtersSelected)
								: newFilters;

						setFiltersSelected(updated);
						applyFilters(updated, localQuery);
					}}
					name="Team Size"
					label="team"
				/>
			</div>

			<div className="flex flex-wrap gap-2">
				{filtersSelected.map((item) => (
					<Badge
						key={item.value}
						variant="secondary"
						className="cursor-pointer hover:bg-gray-300 px-3 py-1"
						onClick={() => {
							const updated = filtersSelected.filter(
								(i) => i.value !== item.value
							);
							setFiltersSelected(updated);
							applyFilters(updated, localQuery);
						}}
					>
						{item.value} ✕
					</Badge>
				))}
			</div>
		</div>
	);
};

export default FilterBar;