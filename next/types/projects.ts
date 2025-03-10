import { InferSelectModel } from "drizzle-orm";
import { project } from "@/db/schema";

import { AreaTable, RoleTable, SkillTable } from "./profile-items";

export type Project = InferSelectModel<typeof project>;

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
