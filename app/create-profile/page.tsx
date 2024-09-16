"use client";
import react, { useReducer } from "react";
import type { Skill, Areas } from "./utils";
import { useState } from "react";
import View1 from "./components/view1";
import View2 from "./components/view2";
import { View3 } from "./components/view3";
import { View4 } from "./components/view4";
import { Card } from "@/components/ui/card";
import type {
	SubmitProfileDataState,
	EducationItem,
	ExperienceItem,
} from "./utils";

interface CreateProfileProps {
	username: string;
	profile: SubmitProfileDataState;
	account_types: string[];
	skills: Skill[];
	areas: Areas[];
}

export type SubmitProfileDataAction =
	| { type: "SET_ACCOUNT_TYPE"; payload: string[] }
	| { type: "SET_BEST_SKILLS"; payload: string[] }
	| { type: "SET_ALL_SKILLS"; payload: string[] }
	| { type: "SET_AREAS"; payload: string[] }
	| { type: "SET_EDUCATION"; payload: EducationItem[] }
	| { type: "SET_EXPERIENCE"; payload: ExperienceItem[] }
	| { type: "SET_NAME"; payload: string }
	| { type: "SET_PRONOUNS"; payload: string }
	| { type: "SET_BIO"; payload: string }
	| { type: "RESET" };

const pageData: CreateProfileProps = {
	username: "Phill",
	profile: {
		// Will be null by default if user has not created a profile
		accountType: ["Developer"],
		bestSkills: ["React"],
		allSkills: ["React", "TypeScript"],
		areas: ["Frontend"],
		education: [
			{
				school: "Stevens Institute of Technology",
				degree: "Bachelors of Science",
				field: "Computer Science",
				startDate: "2020-09",
				endDate: "2024-8",
			},
		],
		experience: [
			{
				company: "Charity Quest",
				position: "Software Engineer",
				startDate: "2024-02-01",
				endDate: "",
			},
		],
		name: "Phill",
		pronouns: "He/Him",
		bio: "I am a software engineer",
	},
	account_types: ["Developer", "Designer", "Product Manager"],
	skills: [
		{ name: "React", innerColor: "#398100", outerColor: "#D9EAA8" },
		{
			name: "TypeScript",
			innerColor: "#007ACC",
			outerColor: "#B3D4FC",
		},
		{ name: "Python", innerColor: "#7B0D00", outerColor: "#E9B0A9" },
	],
	areas: [
		{ name: "Frontend", innerColor: "#398100", outerColor: "#D9EAA8" },
		{ name: "Backend", innerColor: "#007ACC", outerColor: "#B3D4FC" },
		{ name: "DevOps", innerColor: "#7B0D00", outerColor: "#E9B0A9" },
	],
};

export default function Page() {
	const [stage, setStage] = useState(1);
	const totalStages = 4; // Assuming there are 3 stages, update this accordingly.
	const initialState = pageData.profile;

	const submitProfileDataReducer = (
		state: SubmitProfileDataState,
		action: SubmitProfileDataAction,
	): SubmitProfileDataState => {
		switch (action.type) {
			case "SET_ACCOUNT_TYPE":
				return { ...state, accountType: action.payload };
			case "SET_BEST_SKILLS":
				return { ...state, bestSkills: action.payload };
			case "SET_ALL_SKILLS":
				return { ...state, allSkills: action.payload };
			case "SET_AREAS":
				return { ...state, areas: action.payload };
			case "SET_EDUCATION":
				return { ...state, education: action.payload };
			case "SET_EXPERIENCE":
				return { ...state, experience: action.payload };
			case "SET_NAME":
				return { ...state, name: action.payload };
			case "SET_PRONOUNS":
				return { ...state, pronouns: action.payload };
			case "SET_BIO":
				return { ...state, bio: action.payload };
			case "RESET":
				return {
					accountType: [],
					bestSkills: [],
					allSkills: [],
					areas: [],
					education: [],
					experience: [],
					name: "",
					pronouns: "",
					bio: "",
				};
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(
		submitProfileDataReducer,
		initialState,
	);

	const handleLetsGo = () => {
		setStage(2);
	};
	const Dot = ({ index }: { index: number }) => (
		<span
			className={`mx-2 h-4 w-4 cursor-pointer rounded-full ${stage === index + 2 ? "bg-[#353535] hover:bg-black" : "bg-[#D9D9D9] hover:bg-[#8c8c8c]"} duration-100 ease-in-out`}
			onClick={() => setStage(index + 2)}
		/>
	);

	return (
		<div className="bg-light-grey flex h-screen flex-col items-center justify-center">
			{stage === 0 && <View1 username={pageData.username} />}
			{stage === 1 && <View2 handleLetsGo={handleLetsGo} />}
			{stage >= 2 && (
				<Card className=" h-[85%] w-[80%]">
					<div className="mt-4 flex justify-center">
						{Array.from({ length: totalStages }, (_, i) => (
							<Dot key={i} index={i} />
						))}
					</div>
					<div className="bg-primary flex flex-col justify-center">
						{stage === 2 && (
							<View3
								AccountTypes={pageData.account_types}
								ExistingTypes={state.accountType}
								OnUpdate={dispatch}
							/>
						)}
						{stage === 3 && (
							<View4
								skills={pageData.skills}
								ExistingData={state}
								areas={pageData.areas}
								OnUpdate={dispatch}
							/>
						)}
					</div>
				</Card>
			)}
		</div>
	);
}
