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
	languages: ["English","Spanish"]
};

export function ViewProfile() {
	const supabase = createClientSupabase();
	const router = useRouter();

	return (
		<div>
			<Card className="mb-8 flex items-center space-x-8 space-y-1 p-4">
				<CardHeader className=" ">
					<img
						src={SampleUserProfile.avatar_location}
						alt="User Image"
						className="w-25 mb-4 h-auto rounded-full p-2 shadow-md ring-gray-800"
					/>
				</CardHeader>
				<CardContent className="gap- grid w-full">
					<div className="flex grid w-full gap-2">
						<div className="flex w-full items-center justify-between">
							<p style={{ fontSize: "1.7rem" }} className="text-lg font-bold">
								{SampleUserProfile.first_name}{" "}
								{SampleUserProfile.last_name}{" "}
							</p>
              <p className="">
                <div style={{ fontSize: "2rem" }} className=" font-bold">
                  Education
                </div>
          

              
              </p>
							<button className="rounded-lg bg-black p-3 text-white">
								Message
							</button>
						</div>
            <div className="flex w-full items-center justify-between">
            <div style={{ fontSize: "1.3rem" }}className=" text-lg flex items-center gap-2" >
							{SampleUserProfile.role}{" "}
							<div className="rounded-full bg-green-400 p-2 text-white">
								{SampleUserProfile.skill_level}
							</div>
						</div>
            <div className="">
              <div style={{ fontSize: "1.3rem" }} className=" font-bold">
                <br></br>
              {SampleUserProfile.education[0][0]}<br/><br/>
              </div>
            <div style={{ fontSize: "1.1rem" }} className="italic">
			{SampleUserProfile.education[0][1]}<br/>
            {SampleUserProfile.education[0][2]}<br/>
			</div>
            
            </div>
            <div className="">
              
            </div>
       
            <br/>
            
            

            </div>
						
					
					
						<div style={{ fontSize: "1.4rem" }} className="text-lg font-bold">Top Skills:</div>
					
						<div className="flex flex-wrap gap-2">
							{SampleUserProfile.topSkills.map((item, index) => (
								<div
									key={index}
									className="rounded-full  p-2   border border-black font-bold"
								>
									{item}
								</div>
							))}
						</div>
						<br />
						<div style={{ fontSize: "1.4rem" }} className="text-lg font-bold">Skills:</div>
						<div className="flex max-w-md flex-wrap gap-2">
							{SampleUserProfile.skills.map((item, index) => (
								<div
									key={index}
									className="rounded-full  p-2  border border-black font-bold"
								>
									{item}
								</div>
							))}
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
             <div style={{ fontSize: "2rem" }} className="mb-4 mt-4 text-lg font-bold ">
							About
							<br />
						  </div>
						<div className="flex w-1/2 items-center ">
							{SampleUserProfile.bio}
							<br/><br/>
							
							Languages: {SampleUserProfile.languages[0]}, {SampleUserProfile.languages[1]}
						</div>
            </div>

            <div className="border w-full border-black p-6 rounded-lg mr-8">
            <div style={{ fontSize: "1.6rem" }}  className="text-lg font-bold w-full  ">
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
						<div className="flex grid gap-2">
							<div className="text-lg font-bold">
								Experience
								<br />
							</div>
							<div className="">

								<div className="font-bold">
									{SampleUserProfile.experience[0][0]}<br/>	
								</div>
								<div className="italic">
									{SampleUserProfile.experience[0][1]}<br/>	
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
