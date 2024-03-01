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
  pastProjects: string[][],
  experience: string[][],
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
  skills: ["C++","C#","Java","SQL"],
  topSkills: ["C++","C#"],
  education: [["Steven's Institute of Technology"," - Bachelor's of Science : Computer Science"," : 2020-2024"]],
  pastProjects: [["ProjPair", " - a very cool and wholesome project"]],
  experience: [["Meta","- Machine Learning Engineer - ", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, "]]
};

export function ViewProfile() {
  const supabase = createClientSupabase();
  const router = useRouter();

  return (
    <div>
    <Card className="flex items-center space-x-8 space-y-1 p-4 mb-8 ">
      <CardHeader className=" ">
      <img src={SampleUserProfile.avatar_location} alt="User Image" className="w-25 h-auto mb-4 p-2 rounded-full shadow-md ring-gray-800" />
       
        
      </CardHeader>
      <CardContent className="grid gap-">
        <div className="flex grid gap-2">
        <div className="text-lg font-bold">
          {SampleUserProfile.first_name} {SampleUserProfile.last_name} <br/>
        </div>
        <div className="flex items-center gap-2">

        {SampleUserProfile.role}  <div className = "bg-green-400 text-white p-2 rounded-full">
          {SampleUserProfile.skill_level} 
        </div>
        </div>
        
        
          <br />
          <br />
          <div className="text-2x1 font-bold">
            Top Skills: 
          </div>
          <br/>
          <div className="flex flex-wrap gap-2">
            {SampleUserProfile.topSkills.map((item, index) => (
            <div key={index} className="bg-green-400 text-white p-2 rounded-full">
            {item}
        </div>))}
      </div>
          <br/>
          Skills: <br/>
          <div className="flex flex-wrap gap-2 max-w-md">
            {SampleUserProfile.skills.map((item, index) => (
          <div key={index} className="bg-green-400 text-white p-2 rounded-full">
            {item}
          </div>))}
</div>
          
        </div>
   
        
      </CardContent>
      
    </Card>

    <Card className="flex items-center space-x-8 space-y-1 p-4 mb-8 ">
      <CardHeader className=" ">
      
      </CardHeader>
      <CardContent className="grid gap-">
        <div className="flex grid gap-2">
        <div className="text-lg font-bold">
          About<br/>
        </div>
        <div className="max-w-md w-1/2 flex items-center gap-2">

        {SampleUserProfile.bio}  
       
        </div>
        
        
          <br />
          <br />
          <div className="flex grid gap-2">
        <div className="text-lg font-bold">
          Experience<br/>
        </div>
        <div className="">

        <div className="flex flex-col gap-2">
            {SampleUserProfile.experience.map((item, index) => (
          <div key={index} >
            {item}
          
          </div>))}
</div>
       
        </div>
        <br /> 
        <div className="text-lg font-bold">
          Past Projects<br/>
        </div>
        <div className="">

        <div className="flex flex-col gap-2">
            {SampleUserProfile.pastProjects.map((item, index) => (
          <div key={index} >
            {item}
          
          </div>))}
</div>
       
        </div>

        <br />
        <div className="text-lg font-bold">
          Education<br/>
        </div>
        <div className="">

        <div className="flex flex-col gap-2">
            {SampleUserProfile.education.map((item, index) => (
          <div key={index} >
            {item}
          
          </div>))}
</div>
       
        </div>

        
</div>
          
        </div>
   
        
      </CardContent>
      
    </Card>
    
    
    </div>
  );
}