export const example = {
	id: "user_1",
	name: "Yuxi Chen",
	email: "ychen8@example.com",
	image: "/default-avatar.png",

	skills: [
		{
			userId: "user_1",
			skillId: "skill_1",
			skillLevel: "Advanced",
			skill: {
				id: "skill_1",
				name: "C++",
				outerColor: "#3b82f6",
				innerColor: "#fff",
			},
		},
		{
			userId: "user_1",
			skillId: "skill_2",
			skillLevel: "Intermediate",
			skill: {
				id: "skill_2",
				name: "Python",
				outerColor: "#000",
				innerColor: "#fff",
			},
		},
		{
			userId: "user_1",
			skillId: "skill_3",
			skillLevel: "Intermediate",
			skill: {
				id: "skill_3",
				name: "JavaScript",
				outerColor: "#16a34a",
				innerColor: "#fff",
			},
		},
	],

	education: [
		{
			id: "edu_1",
			school: "Stevens Institute of Technology",
			level: "Undergraduate",
			userId: "user_1",
			date: "2022-09-01 - 2026-05-01",
			description: "Computer Science",
		},
	],

	experience: [
		{
			id: "exp_1",
			employer: "PairProj",
			position: "Developer",
			userId: "user_1",
			date: "2025-01-01 - 2025-12-01",
			description: "Designing for profile pages.",
		},
	],

	projectContributions: [
		{
			id: "pm_1",
			userId: "user_1",
			projectId: "proj_1",
			dateJoined: "2025-01-10",
			role: [],
			project: {
				id: "proj_1",
				name: "PairProj",
				description:
					"A platform connects developers with collaborative projects that align with their skill level and interests.",
				profile_picture: "/default-project.png",
			},
		},
	],
};