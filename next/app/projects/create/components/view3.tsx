import { SubmitProject } from "@/types/projects";
import Badge from "@/components/badge";
import { Button } from "@/components/ui/button";
import { SubmitProjectDataAction } from "../create-project";

interface Props {
	State: SubmitProject & Record<string, any>;
	OnUpdate?: React.Dispatch<SubmitProjectDataAction>;
}

const View3: React.FC<Props> = ({ State, OnUpdate }) => {
	const handleSubmit = async () => {
		await fetch("/api/projects", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(State),
		});
	};

	return (
		<div className="flex flex-col p-4 lg:px-40">
			<h1 className="mb-2 text-2xl font-bold">Review Project</h1>

			<h1 className="mb-4 text-2xl font-bold">{State.name}</h1>
			<p className="mb-6">{State.description}</p>

			<div className="mb-4">
				<strong>Skill Level:</strong> <span>{State.skill_level || "(not set)"}</span>
			</div>
			<div className="mb-6">
				<strong>Repository:</strong>{" "}
				{State.github_repository ? (
					<a href={State.github_repository} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
						{State.github_repository}
					</a>
				) : (
					<span>(not set)</span>
				)}
			</div>

			<div className="mb-6">
				<h2 className="mb-2 text-xl font-semibold">Areas of Interest</h2>
				{State.areasOfInterest && State.areasOfInterest.length > 0 ? (
					<div className="flex flex-wrap gap-2 mb-2">
						{State.areasOfInterest.map((area: any) => (
							<div key={area.name} className="flex items-center space-x-2">
								<Badge
									innerColor={area.inner_color ?? area.innerColor}
									outerColor={area.outer_color ?? area.outerColor}
									text={area.name}
								/>
								{OnUpdate && (
									<Button aria-label={`Remove ${area.name}`} variant="ghost" size="icon" onClick={() => OnUpdate({ type: "TOGGLE_AREA", payload: area.name })}>
										<span className="text-sm">×</span>
									</Button>
								)}
							</div>
						))}
					</div>
				) : (
					<span>(no areas selected)</span>
				)}
			</div>

			<h2 className="mb-4 text-xl font-semibold">Roles</h2>
			{Object.entries(State.roles).map(([roleName, roleInfo]) => (
				<div key={roleName} className="mb-6 rounded border p-4 shadow">
					<h3 className="mb-2 text-lg font-bold">{roleName}</h3>
					<p className="mb-4">{roleInfo.description}</p>

					<div className="mb-4">
						<h4 className="mb-2 font-semibold">Skills:</h4>
						<div className="flex flex-wrap gap-2">
									{roleInfo.skills.map((skill) => (
										<div key={(skill as any).id ?? (skill as any).name} className="flex items-center space-x-2">
											<Badge
												innerColor={(skill as any).inner_color ?? (skill as any).innerColor}
												outerColor={(skill as any).outer_color ?? (skill as any).outerColor}
												text={(skill as any).name}
											/>
											{OnUpdate && (
												<Button aria-label={`Remove ${ (skill as any).name }`} variant="ghost" size="icon" onClick={() => OnUpdate({ type: "TOGGLE_SKILL_FOR_ROLE", payload: { roleName, skill, isRequired: false } })}>
													<span className="text-sm">×</span>
												</Button>
											)}
										</div>
									))}
						</div>
					</div>

					<div>
						<h4 className="mb-2 font-semibold">Required Skills:</h4>
						<div className="flex flex-wrap gap-2">
							{roleInfo.requiredSkills.map((skill) => (
								<div key={(skill as any).id ?? (skill as any).name} className="flex items-center space-x-2">
									<Badge
										innerColor={(skill as any).inner_color ?? (skill as any).innerColor}
										outerColor={(skill as any).outer_color ?? (skill as any).outerColor}
										text={(skill as any).name}
									/>
									{OnUpdate && (
										<Button aria-label={`Remove ${ (skill as any).name }`} variant="ghost" size="icon" onClick={() => OnUpdate({ type: "TOGGLE_SKILL_FOR_ROLE", payload: { roleName, skill, isRequired: false } })}>
											<span className="text-sm">×</span>
										</Button>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			))}

			<div className="flex items-center space-x-4 mt-6">
				{OnUpdate && (
					<Button variant="destructive" onClick={() => {
						OnUpdate({ type: "SET_NAME", payload: "" });
						OnUpdate({ type: "SET_DESCRIPTION", payload: "" });
						OnUpdate({ type: "SET_SKILL_LEVEL", payload: "" });
						OnUpdate({ type: "SET_GITHUB", payload: "" });
						(State.areasOfInterest || []).forEach((a: any) => OnUpdate({ type: "TOGGLE_AREA", payload: a.name }));
						Object.keys(State.roles || {}).forEach((r) => OnUpdate({ type: "TOGGLE_ROLE", payload: r }));
					}}>
						Clear All
					</Button>
				)}
				<Button variant="secondary" onClick={handleSubmit}>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default View3;
