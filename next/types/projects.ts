export type Project = {
	id: string;
	name: string | null;
	description: string | null;
	githubLink: string | null;
	difficulty: string;
	isLocked: boolean;
};

export interface Skill {
	id: string;
	name: string;
	innerColor: string;
	outerColor: string;
}

export interface RoleInfo {
	description: string | null;
	skills: Skill[];
	requiredSkills: Skill[];
}

export interface SubmitProject {
	name: string;
	description: string;
	githubLink: string;
	difficulty: string;

	skills: string[];
	areasOfInterest: string[];
	roles: {
		name: string;
		outerColor: string;
		innerColor: string;
		description?: string;
		optionalSkillIds?: string[];
		requiredSkillIds?: string[];
	}[];
}

export type ProjectRoleCreateData = {
	name: string;
	outerColor: string;
	innerColor: string;
	requiredSkillIds?: string[];
	optionalSkillIds?: string[];
};

//still drizzle below
export interface CreateProjectProps {
	areasOfInterest: AreaTable[];
	roles: RoleTable[];
	skills: SkillTable[];
}

export type ProjectProps = Project & {
	roles: Array<{
		id: RoleTable["id"];
		name: RoleTable["name"];
		skills: Array<{
			id: SkillTable["id"];
			name: SkillTable["name"];
			innerColor: SkillTable["inner_color"];
			outerColor: SkillTable["outer_color"];
			isRequired: boolean | null;
		}>;
	}>;
};
