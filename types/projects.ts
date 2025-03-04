import { InferSelectModel } from "drizzle-orm";
import { project } from "@/db/schema";
import dateToMonthYear from "../utils/dateHelpers";

import { AreaTable, RoleTable, Skill, SkillTable } from "./profile-items";
import { areas_of_interest } from "../db/schema";

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
