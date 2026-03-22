import CreateProfile from "./create-profile";
// import { getCreateProfileProps } from "../actions/user";
import { Suspense } from "react";

async function getCreateProfileProps() {
	return {
		profile: {
			name: "Phill",
			email: "phill@example.com",
			image: null,
			areasOfInterest: ["Frontend"],
			skills: [
				{ skillId: "react", skillLevel: "Advanced" },
				{ skillId: "typescript", skillLevel: "Intermediate" },
			],
			education: [
				{
					school: "Stevens Institute of Technology",
					level: "Bachelors of Science",
					date: "2020-08 - 2024-05",
					description: "Computer Science",
				},
			],
			experience: [
				{
					employer: "Charity Quest",
					position: "Software Engineer",
					date: "2021-06 - 2021-08",
					description: "I worked on the frontend",
				},
			],
		},
		skills: [
			{ name: "React", innerColor: "#398100", outerColor: "#D9EAA8" },
			{
				name: "TypeScript",
				innerColor: "#007ACC",
				outerColor: "#B3D4FC",
			},
			{ name: "Python", innerColor: "#7B0D00", outerColor: "#E9B0A9" },
		],
		areas: [
			{ name: "Frontend", innerColor: "#398100", outerColor: "#D9EAA8" },
			{ name: "Backend", innerColor: "#007ACC", outerColor: "#B3D4FC" },
			{ name: "DevOps", innerColor: "#7B0D00", outerColor: "#E9B0A9" },
		],
	};
}

async function CreateProfilePage() {
	const props = await getCreateProfileProps();
	return <CreateProfile pageData={props} />;
}

export default function Page() {
	return (
		//TODO: make this a loading skeleton
		<Suspense fallback={<p>Loading...</p>}>
			<CreateProfilePage />
		</Suspense>
	);
}
