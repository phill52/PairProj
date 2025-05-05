import { createProject } from "@/app/actions/projects";

import { SubmitProject } from "@/types/projects";
import Badge from "@/components/badge";

interface Props {
	State: SubmitProject;
}

const View3: React.FC<Props> = ({ State }) => {
	return (
		<div className="flex flex-col p-4 lg:px-40">
			{/* <h1>Review your shit</h1> */}
			<h1>Review Your Project:</h1>

			<h1 className="mb-4 text-2xl font-bold">{State.name}</h1>
			<p className="mb-6">{State.description}</p>

			<h2 className="mb-4 text-xl font-semibold">Roles</h2>
			{Object.entries(State.roles).map(([roleName, roleInfo]) => (
				<div key={roleName} className="mb-6 rounded border p-4 shadow">
					<h3 className="mb-2 text-lg font-bold">{roleName}</h3>
					<p className="mb-4">{roleInfo.description}</p>

					<div className="mb-4">
						<h4 className="mb-2 font-semibold">Skills:</h4>
						<div className="flex flex-wrap gap-2">
							{roleInfo.skills.map((skill) => (
								<Badge
									key={skill.name}
									innerColor={skill.inner_color}
									outerColor={skill.outer_color}
									text={skill.name}
								/>
							))}
						</div>
					</div>

					<div>
						<h4 className="mb-2 font-semibold">Required Skills:</h4>
						<div className="flex flex-wrap gap-2">
							{roleInfo.requiredSkills.map((skill) => (
								<Badge
									key={skill.name}
									innerColor={skill.inner_color}
									outerColor={skill.outer_color}
									text={skill.name}
								/>
							))}
						</div>
					</div>
				</div>
			))}

			<button
				className="rounded-lg bg-blue-500 px-4 py-2 text-white"
				onClick={() => createProject(State)}
			>
				{" "}
				SUBMIT
			</button>
		</div>
	);
};

export default View3;
