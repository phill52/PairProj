"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { createClientSupabase } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type UserProfile = {
	first_name: string;
	last_name: string;
	bio: string;
	skill_level: string;
	resume_location: string;
	avatar_location: string;
	email: string;
	role: string;
	skills: string[];
	topSkills: string[];
	education: string[][];
	pastProjects: string[][];
	experience: string[][];
	languages: string[];
};

const SampleUserProfile: UserProfile = {
	first_name: "Justus",
	last_name: "Neumeister",
	bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	skill_level: "Intermediate",
	resume_location: "./images/profile.jpg",
	avatar_location: "./images/profile.jpg",
	email: "jneumeis@stevens.edu",
	role: "Software Engineer",
	skills: ["C++", "C#", "Java", "SQL"],
	topSkills: ["C++", "C#"],
	education: [
		[
			"Steven's Institute of Technology",
			"Bachelor's of Science : Computer Science",
			"2020-2024",
		],
	],
	pastProjects: [["ProjPair", "a very cool and wholesome project"]],
	experience: [
		[
			"Meta",
			"Machine Learning Engineer",
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
		],
	],
	languages: ["English", "Spanish"],
};

export function ViewProfile({ profile }: { profile: UserProfile }) {
	//TODO: replace instances of SampleUserProfile with the profile prop when we have the backend set up
	const supabase = createClientSupabase();
	const router = useRouter();

	return (
		<div>
			<Card className="mb-8 flex items-center space-x-8 space-y-1 p-4">
				<CardHeader className=" ">
					<Avatar className="w-25 mb-4 h-auto rounded-full p-2 shadow-md ring-gray-800">
						<AvatarImage
							src={SampleUserProfile.avatar_location}
							alt="User Image"
						/>
						<AvatarFallback className="bg-gray-300">
							{SampleUserProfile?.first_name[0]}
							{SampleUserProfile?.last_name[0]}
						</AvatarFallback>
					</Avatar>
				</CardHeader>
				<CardContent className="gap- grid w-full">
					<div className="flex w-full flex-col gap-2 lg:flex-row">
						<div className="flex w-full flex-col items-start justify-center bg-red-200">
							<p
								style={{ fontSize: "1.7rem" }}
								className="text-lg font-bold"
							>
								{SampleUserProfile.first_name}{" "}
								{SampleUserProfile.last_name}
							</p>
							<div
								style={{ fontSize: "1.3rem" }}
								className=" flex items-center gap-2 text-lg"
							>
								{SampleUserProfile.role}{" "}
								<div className="rounded-full bg-green-400 p-2 text-white">
									{SampleUserProfile.skill_level}
								</div>
							</div>
							<div
								style={{ fontSize: "1.4rem" }}
								className="text-lg font-bold"
							>
								Top Skills:
							</div>
							<div className="flex flex-wrap gap-2">
								{SampleUserProfile.topSkills.map(
									(item, index) => (
										<div
											key={index}
											className="rounded-full  border   border-black p-2 font-bold"
										>
											{item}
										</div>
									),
								)}
							</div>
							<div
								style={{ fontSize: "1.4rem" }}
								className="text-lg font-bold"
							>
								Skills:
							</div>
							<div className="flex max-w-md flex-wrap gap-2">
								{SampleUserProfile.skills.map((item, index) => (
									<div
										key={index}
										className="rounded-full  border  border-black p-2 font-bold"
									>
										{item}
									</div>
								))}
							</div>
						</div>
						<div className="flex w-full flex-col items-center justify-between bg-blue-200">
							<h2
								style={{ fontSize: "1.6rem" }}
								className="w-full text-lg font-bold  "
							>
								Education
							</h2>

							{/* TODO:Finish rest of this when I fix the typing here. */}
							{/* {SampleUserProfile.education.map(
								(item)=> {
									return (
										<h3 className="">{ite}</h3>
									)
								}} */}
							<div className=""></div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="mb-4 flex items-center space-x-8 space-y-1 p-4 ">
				<CardHeader className=" "></CardHeader>
				<CardContent className="gap- grid">
					<div className="flex grid">
						<div className="flex w-full items-center justify-between">
							<div>
								<div
									style={{ fontSize: "2rem" }}
									className="mb-4 mt-4 text-lg font-bold "
								>
									About
									<br />
								</div>
								<div className="flex w-1/2 items-center ">
									{SampleUserProfile.bio}
									<br />
									<br />
									Languages: {
										SampleUserProfile.languages[0]
									}, {SampleUserProfile.languages[1]}
								</div>
							</div>

							<div className="mr-8 w-full rounded-lg border border-black p-6">
								<div
									style={{ fontSize: "1.6rem" }}
									className="w-full text-lg font-bold  "
								>
									Past Projects
									<br />
								</div>
								<div className="italic">
									{SampleUserProfile.pastProjects[0][0]}
								</div>

								{SampleUserProfile.pastProjects[0][1]}
							</div>
						</div>

						<br />
						<br />
						<div className="flex gap-2">
							<div className="text-lg font-bold">
								Experience
								<br />
							</div>
							<div className="">
								<div className="font-bold">
									{SampleUserProfile.experience[0][0]}
									<br />
								</div>
								<div className="italic">
									{SampleUserProfile.experience[0][1]}
									<br />
								</div>

								{SampleUserProfile.experience[0][2]}
							</div>
							<br />

							<br />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
