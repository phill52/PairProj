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
}

export interface RoleInfo {
	description: string | null;
	skills: SkillTable[];
	requiredSkills: SkillTable[];
}
export interface SubmitProject {
	name: string;
	description: string;
	areasOfInterest: AreaTable[];
	roles: {
		[roleName: string]: RoleInfo;
	};

	skill_level?: string | null;
	github_repository?: string | null;
}

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
