export type Skill = {
	name: string;
	innerColor: string;
	outerColor: string;
};
export type Areas = {
	name: string;
	innerColor: string;
	outerColor: string;
};

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
	startDate: Date;
	endDate: Date | null;
};

export interface SubmitProfileDataState {
	accountType: string[];
	bestSkills: string[];
	allSkills: string[];
	areas: string[];
	education: EducationItem[];
	experience: ExperienceItem[];
	name: string;
	pronouns: string;
	bio: string;
}
