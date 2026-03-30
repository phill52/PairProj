<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 05a448d (Improved page & updated to work with new database)
import { AreaTable, RoleTable, SkillTable } from "./profile-items";

export interface Project {
	id: string;
	created_at?: string;
	name?: string | null;
	description?: string | null;
	owner_profile_id?: string | null;
	skill_level?: string | null;
	github_repository?: string | null;
	is_locked?: boolean | null;
	profile_picture?: string | null;
<<<<<<< HEAD
>>>>>>> 05a448d (Improved page & updated to work with new database)
=======
>>>>>>> 05a448d (Improved page & updated to work with new database)
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
<<<<<<< HEAD
		name: string;
		outerColor: string;
		innerColor: string;
		description?: string;
		optionalSkillIds?: string[];
		requiredSkillIds?: string[];
	}[];
=======
		[roleName: string]: RoleInfo;
	};

	skill_level?: string | null;
	github_repository?: string | null;
<<<<<<< HEAD
>>>>>>> 05a448d (Improved page & updated to work with new database)
=======
>>>>>>> 05a448d (Improved page & updated to work with new database)
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
