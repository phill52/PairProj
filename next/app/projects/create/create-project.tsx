"use client";

import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";

import View1 from "./components/view1";
import View2 from "./components/view2";
import View3 from "./components/view3";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { CreateProjectProps } from "@/types/projects";
import { SkillTable } from "@/types";

type RoleInfoLocal = {
	description: string | null;
	skills: SkillTable[];
	requiredSkills: SkillTable[];
};

export type SubmitProject = {
	name: string;
	description: string;
	areasOfInterest: string[];
	roles: Record<string, RoleInfoLocal>;
	difficulty: string;
	githubLink: string;
};

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
	createProjectAction,
}: {
	pageData: CreateProjectProps;
	createProjectAction?: (data: any) => Promise<any>;
}) {
	const [stage, setStage] = useState(0);
	const totalStages = 3;
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const buildPayload = (state: SubmitProject, pageData: CreateProjectProps) => {
		const areas = (state.areasOfInterest || [])
			.map((name) => pageData.areasOfInterest.find((a) => a.name === name)?.id)
			.filter((id): id is string => Boolean(id));


		const findSkillIdByName = (name: string) =>
			pageData.skills.find((s) => s.name === name)?.id;

		const allSkillIds = new Set<string>();

		const roles = Object.entries(state.roles || {}).map(([roleName, info]) => {

			const roleRef = pageData.roles.find((r) => r.name === roleName);
			const outerColor = roleRef?.outerColor ?? (roleRef as any)?.outer_color ?? "#D9D9D9";
			const innerColor = roleRef?.innerColor ?? (roleRef as any)?.inner_color ?? "#000000";

			const optionalSkillIds = (info.skills || [])
				.map((s: any) => s.id ?? findSkillIdByName(s.name))
				.filter((id: string | undefined): id is string => Boolean(id));
			const requiredSkillIds = (info.requiredSkills || [])
				.map((s: any) => s.id ?? findSkillIdByName(s.name))
				.filter((id: string | undefined): id is string => Boolean(id));

			optionalSkillIds.forEach((id) => allSkillIds.add(id));
			requiredSkillIds.forEach((id) => allSkillIds.add(id));

			return {
				name: roleName,
				outerColor,
				innerColor,
				description: info.description || undefined,
				optionalSkillIds: optionalSkillIds.length ? optionalSkillIds : undefined,
				requiredSkillIds: requiredSkillIds.length ? requiredSkillIds : undefined,
			};
		});

		return {
			name: state.name,
			description: state.description,
			githubLink: state.githubLink,
			difficulty: state.difficulty,
			skills: Array.from(allSkillIds),
			areasOfInterest: areas,
			roles,
		};
	};

	const submitProjectStateReducer = (
		state: SubmitProject,
		action: SubmitProjectDataAction,
	): SubmitProject => {
		switch (action.type) {
			case "SET_NAME":
				return { ...state, name: action.payload };
			case "SET_DESCRIPTION":
				return { ...state, description: action.payload };
			case "TOGGLE_AREA": {
				const areaName = action.payload;

				const areaExistsOnServer = pageData.areasOfInterest.some(
					(a) => a.name === areaName,
				);

				const finalAreaName = areaExistsOnServer ? areaName : areaName;

				const exists = state.areasOfInterest.includes(finalAreaName);

				if (!exists) {
					return {
						...state,
						areasOfInterest: [...state.areasOfInterest, finalAreaName],
					};
				}

				return {
					...state,
					areasOfInterest: state.areasOfInterest.filter(
						(a) => a !== finalAreaName,
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
				return { ...state, difficulty: action.payload };
			case "SET_GITHUB":
				return { ...state, githubLink: action.payload };
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
		difficulty: "",
		githubLink: "",
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
						<div className="flex items-center">
							{stage > 0 ? (
								<Button size="lg" variant="ghost" onClick={() => setStage(Math.max(0, stage - 1))}>
									Back
								</Button>
							) : (
								<div />
							)}
							{error && <p className="ml-4 text-sm text-red-600">{error}</p>}
						</div>

						<div>
							{stage < totalStages - 1 && (
								<Button size="lg" variant="secondary" onClick={() => setStage(stage + 1)}>
									Next
								</Button>
							)}
							{stage === totalStages - 1 && (
								<Button size="lg" variant="secondary" disabled={submitting} onClick={async () => {
										try {
											setSubmitting(true);
											setError(null);
											const payload = buildPayload(state, pageData);

											// Client-side validation: require at least one role
											if (!payload.roles || payload.roles.length === 0) {
												setError("Please add at least one role to the project.");
												setSubmitting(false);
												return;
											}

											if (!createProjectAction) {
												throw new Error('No server action provided');
											}
											const created = await createProjectAction(payload);
											console.log('Submitted project payload', payload, created);
											if (created && (created as any).id) {
												router.push(`/projects/${(created as any).id}`);
											}
										} catch (e) {
											console.error('Submit failed', e);
											setError('Failed to submit project.');
										} finally {
											setSubmitting(false);
										}
								}}>
									{submitting ? 'Submitting...' : 'Finish'}
								</Button>
							)}
						</div>
					</div>
				</Card>
		</div>
	);
}
