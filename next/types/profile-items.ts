import { Prisma } from "@prisma/client";

export type SkillTable = Prisma.SkillGetPayload<{}>;
export type AreaTable = Prisma.AreaOfInterestGetPayload<{}>;
export type EducationTable = Prisma.EducationGetPayload<{}>;
export type ExperienceTable = Prisma.ExperienceGetPayload<{}>;

export type EducationItem = {
	school: string;
	level: string;
	date: string;
	description: string;
};

export type ExperienceItem = {
	employer: string;
	position: string;
	date: string;
	description: string
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

export interface SubmitProfile {
	name: string | null;
	email: string | null;
	image: string | null;
	areasOfInterest: string[];
	skills: {
		skillId: string;
		skillLevel: string;
	}[];
	education: EducationItem[];
	experience: ExperienceItem[];

}

//havent worked below here yet
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
	skills: SkillTable[];
	areas: AreaTable[];
}
