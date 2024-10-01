import { InferSelectModel } from "drizzle-orm";
import {
	users,
	profile_education,
	profile_work_experience,
	skill,
	role,
	areas_of_interest,
} from "@/db/schema";
import { Project } from "./projects";

// export type Skill = {
// 	name: string;
// 	innerColor: string;
// 	outerColor: string;
// };

export type SkillTable = InferSelectModel<typeof skill>;

export type EducationTable = InferSelectModel<typeof profile_education>;

export type ExperienceTable = InferSelectModel<typeof profile_work_experience>;

export type AreaTable = InferSelectModel<typeof areas_of_interest>;

export type RoleTable = InferSelectModel<typeof role>;

export type EducationItem = {
	school: string;
	degree: string;
	field: string;
	startDate: Date;
	endDate: Date | null;
};

export type ExperienceItem = {
	company: string;
	position: string;
	description: string;
	startDate: Date;
	endDate: Date | null;
};

export type Areas = {
	name: string;
	innerColor: string;
	outerColor: string;
};

export type Skill = {
	name: string;
	innerColor: string;
	outerColor: string;
};

export interface UserProfileProject {
	id: number;
	name: string;
	description: string;
	picture: string;
	skills: Skill[];
}

export interface SubmitProfile {
	username: string | null;
	first_name: string | null;
	last_name: string | null;
	account_type: RoleTable[];
	best_skills: SkillTable[];
	all_skills: SkillTable[];
	areas: AreaTable[];
	education: EducationItem[];
	experience: ExperienceItem[];
	pronouns: string | null;
	bio: string | null;
}

export interface ViewProfileProps {
	username: string;
	first_name: string;
	last_name: string;
	bio: string;
	skill_level: string;
	resume_location: string;
	avatar_location: string;
	email: string;
	role: string;
	pronouns: string;
	all_skills: Skill[];
	best_skills: Skill[];
	education: EducationItem[];
	past_projects: UserProfileProject[];
	experience: ExperienceItem[];
}

export interface CreateProfileProps {
	profile: SubmitProfile;
	roles: RoleTable[];
	skills: SkillTable[];
	areas: AreaTable[];
}
