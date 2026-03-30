"use client";

import { useReducer, useState } from "react";

import View1 from "./components/view1";
import View2 from "./components/view2";
import View3 from "./components/view3";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { SubmitProject, CreateProjectProps } from "@/types/projects";
import { SkillTable } from "@/types";

export type SubmitProjectDataAction =
	| { type: "SET_NAME"; payload: string }
	| { type: "SET_DESCRIPTION"; payload: string }
	| { type: "TOGGLE_AREA"; payload: string }
	| { type: "TOGGLE_ROLE"; payload: string }
	| {
			type: "TOGGLE_SKILL_FOR_ROLE";
			payload: {
				roleName: string;
				skill: SkillTable;
				isRequired: boolean;
			};
	  }
	| {
			type: "SET_ROLE_DESCRIPTION";
			payload: { roleName: string; description: string };
	  }
	| { type: "SET_SKILL_LEVEL"; payload: string }
	| { type: "SET_GITHUB"; payload: string };

export default function CreateProject({
	pageData,
}: {
	pageData: CreateProjectProps;
}) {
	const [stage, setStage] = useState(0);
	const totalStages = 3;

	const submitProjectStateReducer = (
		state: SubmitProject,
		action: SubmitProjectDataAction,
	): SubmitProject => {
		switch (action.type) {
			case "SET_NAME":
				return { ...state, name: action.payload };
			case "SET_DESCRIPTION":
				return { ...state, description: action.payload };
			case "TOGGLE_AREA":
				let area = pageData.areasOfInterest.find(
					(a) => a.name === action.payload,
				);
				// If area isn't provided by the server (e.g. local dev without DB),
				// allow adding custom areas by creating a minimal area object.
				if (!area) {
					area = ({
						name: action.payload,
						inner_color: "#000000",
						outer_color: "#D9D9D9",
					} as unknown) as any;
				}
				const areaIndex = state.areasOfInterest.findIndex(
					(a) => a.name === area.name,
				);
				if (areaIndex === -1) {
					return {
						...state,
						areasOfInterest: [...state.areasOfInterest, area],
					};
				} else {
					return {
						...state,
						areasOfInterest: state.areasOfInterest.filter(
							(a) => a.name !== area.name,
						),
					};
				}
			case "TOGGLE_ROLE":
				const role = action.payload;
				if (state.roles[role]) {
					const { [role]: _, ...roles } = state.roles;
					return { ...state, roles };
				} else {
					return {
						...state,
						roles: {
							...state.roles,
							[role]: {
								description: null,
								skills: [],
								requiredSkills: [],
							},
						},
					};
				}
			case "SET_ROLE_DESCRIPTION":
				return {
					...state,
					roles: {
						...state.roles,
						[action.payload.roleName]: {
							...state.roles[action.payload.roleName],
							description: action.payload.description,
						},
					},
				};
			case "TOGGLE_SKILL_FOR_ROLE":
				const { roleName, skill, isRequired } = action.payload;
				const roleInfo = state.roles[roleName];
				if (!roleInfo) return state;

				let updatedSkills = [...roleInfo.skills];
				const skillIndex = updatedSkills.findIndex(
					(s) => s.name === skill.name,
				);

				let updatedRequiredSkills = [...roleInfo.requiredSkills];
				const requiredSkillIndex = updatedRequiredSkills.findIndex(
					(s) => s.name === skill.name,
				);

				if (isRequired) {
					if (requiredSkillIndex === -1) {
						updatedRequiredSkills.push(skill);
						if (skillIndex === -1) {
							updatedSkills.push(skill);
						}
					} else {
						updatedRequiredSkills = updatedRequiredSkills.filter(
							(s) => s.name !== skill.name,
						);
					}
				} else {
					if (skillIndex === -1) {
						updatedSkills.push(skill);
					} else {
						updatedSkills = updatedSkills.filter(
							(s) => s.name !== skill.name,
						);
						updatedRequiredSkills = updatedRequiredSkills.filter(
							(s) => s.name !== skill.name,
						);
					}
				}
				return {
					...state,
					roles: {
						...state.roles,
						[roleName]: {
							...roleInfo,
							skills: updatedSkills,
							requiredSkills: updatedRequiredSkills,
						},
					},
				};
			case "SET_SKILL_LEVEL":
				return { ...state, skill_level: action.payload };
			case "SET_GITHUB":
				return { ...state, github_repository: action.payload };
			default:
				return state;
		}
	};

	const Dot = ({ index }: { index: number }) => (
		<span
			className={`mx-2 h-4 w-4 cursor-pointer rounded-full ${stage === index ? "bg-[#353535] hover:bg-black" : "bg-[#D9D9D9] hover:bg-[#8c8c8c]"} duration-100 ease-in-out`}
			onClick={() => setStage(index)}
		/>
	);

	const initialProjectState: SubmitProject = {
		name: "",
		description: "",
		areasOfInterest: [],
		roles: {},
		skill_level: "",
		github_repository: "",
	};

	const [state, dispatch] = useReducer(
		submitProjectStateReducer,
		initialProjectState,
	);

	return (
		<div className="flex h-screen flex-col items-center justify-center overflow-scroll bg-light-grey">
			<Card className="relative h-[85%] w-[80%]">
				<div className="h-full overflow-auto p-6 pb-28">
					<div className="mt-4 flex justify-center">
						{Array.from({ length: totalStages }, (_, i) => (
							<Dot key={i} index={i} />
						))}
					</div>
					{stage === 0 && (
						<View1
							State={state}
							OnUpdate={dispatch}
							areas={pageData.areasOfInterest}
						/>
						)}
						{stage === 1 && (
							<View2
								State={state}
								OnUpdate={dispatch}
								roles={pageData.roles}
								skills={pageData.skills}
							/>
						)}
						{stage === 2 && <View3 State={state} OnUpdate={dispatch} />}
					</div>

					<div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t px-6 py-4 bg-white dark:bg-slate-950">
						{stage > 0 ? (
							<Button size="lg" variant="ghost" onClick={() => setStage(Math.max(0, stage - 1))}>
								Back
							</Button>
						) : (
							<div />
						)}

						<div>
							{stage < totalStages - 1 && (
								<Button size="lg" variant="secondary" onClick={() => setStage(stage + 1)}>
									Next
								</Button>
							)}
							{stage === totalStages - 1 && (
								<Button size="lg" variant="secondary" onClick={() => console.log("Finished project state:", state)}>
									Finish
								</Button>
							)}
						</div>
					</div>
				</Card>
		</div>
	);
}
