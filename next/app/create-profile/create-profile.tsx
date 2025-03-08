"use client";
import react, { useReducer } from "react";
import type { Skill, Areas } from "../../types/profile-items";
import { useState } from "react";
import View1 from "./components/view1";
import View2 from "./components/view2";
import { View3 } from "./components/view3";
import { View4 } from "./components/view4";
import { Card } from "@/components/ui/card";
import type {
	SubmitProfile,
	EducationItem,
	ExperienceItem,
	CreateProfileProps,
	RoleTable,
	SkillTable,
	AreaTable,
} from "../../types/profile-items";
import View5 from "./components/view5";
import View6 from "./components/view6";

export type SubmitProfileDataAction =
	| { type: "SET_ROLES"; payload: RoleTable[] }
	| { type: "SET_BEST_SKILLS"; payload: SkillTable[] }
	| { type: "SET_ALL_SKILLS"; payload: SkillTable[] }
	| { type: "SET_AREAS"; payload: AreaTable[] }
	| { type: "SET_EDUCATION"; payload: EducationItem[] }
	| { type: "SET_EXPERIENCE"; payload: ExperienceItem[] }
	| { type: "SET_USERNAME"; payload: string }
	| { type: "SET_FIRSTNAME"; payload: string }
	| { type: "SET_LASTNAME"; payload: string }
	| { type: "SET_PRONOUNS"; payload: string }
	| { type: "SET_BIO"; payload: string }
	| { type: "RESET" };

// const pageData: CreateProfileProps = {
// 	profile: {
// 		// Will be null by default if user has not created a profile
// 		username: "Phill52",
// 		first_name: "Phillip",
// 		last_name: "Anerine",
// 		account_type: ["Developer"],
// 		best_skills: ["React"],
// 		all_skills: ["React", "TypeScript"],
// 		areas: ["Frontend"],
// 		education: [
// 			{
// 				school: "Stevens Institute of Technology",
// 				degree: "Bachelors of Science",
// 				field: "Computer Science",
// 				startDate: new Date("2020-08"),
// 				endDate: new Date("2024-05"),
// 			},
// 		],
// 		experience: [
// 			{
// 				company: "Charity Quest",
// 				description: "I worked on the frontend",
// 				position: "Software Engineer",
// 				startDate: new Date("2021-06"),
// 				endDate: new Date("2021-08"),
// 			},
// 		],
// 		name: "Phill",
// 		pronouns: "He/Him",
// 		bio: "I am a software engineer",
// 	},
// 	account_types: ["Developer", "Designer", "Product Manager"],
// 	skills: [
// 		{ name: "React", innerColor: "#398100", outerColor: "#D9EAA8" },
// 		{
// 			name: "TypeScript",
// 			innerColor: "#007ACC",
// 			outerColor: "#B3D4FC",
// 		},
// 		{ name: "Python", innerColor: "#7B0D00", outerColor: "#E9B0A9" },
// 	],
// 	areas: [
// 		{ name: "Frontend", innerColor: "#398100", outerColor: "#D9EAA8" },
// 		{ name: "Backend", innerColor: "#007ACC", outerColor: "#B3D4FC" },
// 		{ name: "DevOps", innerColor: "#7B0D00", outerColor: "#E9B0A9" },
// 	],
// };

export default function CreateProfile({
	pageData,
}: {
	pageData: CreateProfileProps;
}) {
	const [stage, setStage] = useState(1);
	const totalStages = 4; // Assuming there are 3 stages, update this accordingly.
	const initialState = pageData.profile;

	const submitProfileDataReducer = (
		state: SubmitProfile,
		action: SubmitProfileDataAction,
	): SubmitProfile => {
		switch (action.type) {
			case "SET_ROLES":
				return { ...state, account_type: action.payload };
			case "SET_BEST_SKILLS":
				return { ...state, best_skills: action.payload };
			case "SET_ALL_SKILLS":
				return { ...state, all_skills: action.payload };
			case "SET_AREAS":
				return { ...state, areas: action.payload };
			case "SET_EDUCATION":
				return { ...state, education: action.payload };
			case "SET_EXPERIENCE":
				return { ...state, experience: action.payload };
			case "SET_USERNAME":
				return { ...state, username: action.payload };
			case "SET_FIRSTNAME":
				return { ...state, first_name: action.payload };
			case "SET_LASTNAME":
				return { ...state, last_name: action.payload };
			case "SET_PRONOUNS":
				return { ...state, pronouns: action.payload };
			case "SET_BIO":
				return { ...state, bio: action.payload };
			case "RESET":
				return {
					username: "",
					first_name: "",
					last_name: "",
					account_type: [],
					best_skills: [],
					all_skills: [],
					areas: [],
					education: [],
					experience: [],
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
		<div className="flex h-screen flex-col items-center justify-center overflow-scroll bg-light-grey">
			{stage === 0 && <View1 />}
			{stage === 1 && <View2 handleLetsGo={handleLetsGo} />}
			{stage >= 2 && (
				<Card className=" h-[85%] w-[80%] overflow-scroll">
					<div className="mt-4 flex justify-center">
						{Array.from({ length: totalStages }, (_, i) => (
							<Dot key={i} index={i} />
						))}
					</div>
					<div className="bg-primary flex flex-col justify-center">
						{stage === 2 && (
							<View3
								AccountTypes={pageData.roles}
								ExistingTypes={state.account_type}
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
						{stage === 4 && (
							<View5
								ExistingEducation={state.education}
								ExistingExperience={state.experience}
								OnUpdate={dispatch}
							/>
						)}
						{stage === 5 && (
							<View6 Profile={state} OnUpdate={dispatch} />
						)}
					</div>
				</Card>
			)}
		</div>
	);
}
