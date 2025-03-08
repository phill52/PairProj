"use client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "./multi-select";
import skillIcons from "@/components/skillIcons";
import { useFilters } from "../FiltersContext";
import { Button } from "@/components/ui/button";

const projectSizes = [
	{
		value: "1-5",
		label: "1 - 5",
	},
	{
		value: "6-10",
		label: "6 - 10",
	},
	{
		value: "11-50",
		label: "11 - 50",
	},
	{
		value: "51-100",
		label: "51 - 100",
	},
	{
		value: "101-500",
		label: "101 - 500",
	},
	{
		value: "500+",
		label: "500+",
	},
];

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

const projectTypes = [
	{ value: "Good for Beginners", label: "Good for Beginners" },
	{ value: "Active Community", label: "Active Community" },
	{ value: "Mentorship Opportunities", label: "Mentorship Opportunities" },
	{ value: "Recently Popular", label: "Recently Popular" },
	{ value: "New Project", label: "New Project" },
	{ value: "Well Maintained", label: "Well Maintained" },
	{ value: "High Impact", label: "High Impact" },
	{ value: "Cutting Edge Technology", label: "Cutting Edge Technology" },
	{ value: "Eco-Friendly", label: "Eco-Friendly" },
	{ value: "Social Good", label: "Social Good" },
	{ value: "Educational", label: "Educational" },
	{ value: "Health & Wellness", label: "Health & Wellness" },
	{ value: "Open Source", label: "Open Source" },
	{ value: "Enterprise Level", label: "Enterprise Level" },
	{ value: "Financial Tech", label: "Financial Tech" },
	{ value: "Security Focused", label: "Security Focused" },
	{ value: "AI & Machine Learning", label: "AI & Machine Learning" },
	{
		value: "Blockchain & Cryptocurrency",
		label: "Blockchain & Cryptocurrency",
	},
	{
		value: "Data Analysis & Visualization",
		label: "Data Analysis & Visualization",
	},
	{
		value: "AR/VR (Augmented & Virtual Reality)",
		label: "AR/VR (Augmented & Virtual Reality)",
	},
	{ value: "Gaming", label: "Gaming" },
	{ value: "Local Community Projects", label: "Local Community Projects" },
	{ value: "Hackathon Winners", label: "Hackathon Winners" },
	{ value: "Award Winning", label: "Award Winning" },
];

const skillLevels = [
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
			<div className="flex flex-wrap items-center gap-4">
				<div className="max-w-lg flex-grow">
					<Input
						type="text"
						placeholder="Browse projects with keywords..."
						className="mr-8"
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
				<div>
					<MultiSelect
						options={skills}
						selected={filtersSelected}
						onChange={setFiltersSelected}
						className=""
						name="Skills"
						label="skills"
					/>
				</div>
				<div>
					<MultiSelect
						options={projectSizes}
						selected={filtersSelected}
						onChange={setFiltersSelected}
						className="w-md"
						name="Project Size"
						label="projectSize"
					/>
				</div>
				<div>
					<MultiSelect
						options={projectTypes}
						selected={filtersSelected}
						onChange={setFiltersSelected}
						className="w-md"
						name="Project Type"
						label="projectType"
					/>
				</div>
				<div>
					<MultiSelect
						options={skillLevels}
						selected={filtersSelected}
						onChange={setFiltersSelected}
						className="w-md"
						name="Skill Level"
						label="skillLevel"
					/>
				</div>
			</div>
			<div className="flex flex-wrap gap-1">
				{filtersSelected.map((item) => {
					const iconSrc = skillIcons[item.value];
					return (
						<Badge
							variant="secondary"
							key={item.value}
							className="mb-1 mr-1"
							onClick={() => handleUnselect(item.value)}
						>
							{iconSrc && (
								<Image
									alt={`${item} icon`}
									src={iconSrc}
									width={20}
									height={20}
									className="mr-2"
								/>
							)}
							{item.value}
							<Button
								className="ml-2 bg-transparent p-0 shadow-none outline-none hover:bg-transparent"
								onClick={() => handleUnselect(item.value)}
							>
								<Image
									alt="x"
									src="/icons/x.svg"
									width={16}
									height={16}
								/>
							</Button>
						</Badge>
					);
				})}
			</div>
		</div>
	);
};

export default FilterBar;
