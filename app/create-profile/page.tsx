"use client";
import react, { useReducer } from "react";
import type { Skill, Areas } from "./utils";
import { useState } from "react";
import View1 from "./components/view1";
import View2 from "./components/view2";
import { View3 } from "./components/view3";
import { View4 } from "./components/view4";
import { Card } from "@/components/ui/card";
import type { SubmitProfileDataState } from "./utils";

type CreateProfileProps = {
	username: string;
	account_types: string[];
	skills: Skill[];
	areas: Areas[];
};

const pageData: CreateProfileProps = {
	username: "Phill",
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
	const [stage, setStage] = useState(2);
	const totalStages = 4; // Assuming there are 3 stages, update this accordingly
	const initialState: SubmitProfileDataState = {
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

	// Action types
	enum ActionTypes {
		ADD = "ADD",
		REMOVE = "REMOVE",
		SET = "SET",
		UPDATE = "UPDATE",
	}

	type Action =
		| {
				type: ActionTypes.ADD | ActionTypes.REMOVE;
				field: keyof SubmitProfileDataState;
				payload?: any;
				index?: number;
		  }
		| {
				type: ActionTypes.SET;
				field: keyof SubmitProfileDataState;
				payload: any;
		  }
		| {
				type: ActionTypes.UPDATE;
				field: keyof SubmitProfileDataState;
				index: number;
				payload: any;
		  };

	function reducer(
		state: SubmitProfileDataState,
		action: Action,
	): SubmitProfileDataState {
		switch (action.type) {
			case "ADD":
			case "REMOVE":
				// Assert that the field is one of the keys pointing to an array in SubmitData
				const key = action.field as keyof SubmitProfileDataState;
				if (Array.isArray(state[key])) {
					// Now TypeScript knows state[key] is an array, but you still need to assert the specific array type
					// This assertion is safe because you're within the Array.isArray check
					const updatedArray = updateArray(state[key] as any[], {
						operation: action.type,
						payload: action.payload,
						index: action.index,
					});
					return {
						...state,
						[key]: updatedArray,
					};
				} else {
					throw new Error(
						`Attempted to ${action.type} on non-array field: ${action.field}`,
					);
				}
			case "SET":
				return {
					...state,
					[action.field]: action.payload,
				};
			case "UPDATE":
				const updateKey = action.field as keyof SubmitProfileDataState;
				if (Array.isArray(state[updateKey])) {
					const updatedArray = state[updateKey].map((item, index) =>
						index === action.index
							? { ...item, ...action.payload }
							: item,
					) as any; // Ensure the type matches the specific array item type
					return {
						...state,
						[updateKey]: updatedArray,
					};
				} else {
					throw new Error(
						`Attempted to UPDATE on non-array field: ${action.field}`,
					);
				}
			default:
				throw new Error(`Unhandled action type: ${action.type}`);
		}
	}

	// Helper function for updating arrays, now using TypeScript for payload and index typing
	const updateArray = (
		array: any[],
		action: {
			operation: "ADD" | "REMOVE";
			payload?: any;
			index?: number;
		},
	): any[] => {
		switch (action.operation) {
			case "ADD":
				return [...array, action.payload];
			case "REMOVE":
				return array.filter((_, index) => index !== action.index);
			default:
				return array;
		}
	};

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
							<View3 AccountTypes={pageData.account_types} />
						)}
						{stage === 3 && (
							<View4
								skills={pageData.skills}
								areas={pageData.areas}
							/>
						)}
					</div>
				</Card>
			)}
		</div>
	);
}
