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
};

const SampleUserProfile: UserProfile = {
  first_name: "Justus",
  last_name: "Neumeister",
  bio: "A very cool Guy",
  skill_level: "Intermediate",
  resume_location: "./images/profile.jpg",
  avatar_location: "./images/profile.jpg",
  email: "jneumeis@stevens.edu",
};

export function ViewProfile() {
  const supabase = createClientSupabase();
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">
          {SampleUserProfile.first_name} {SampleUserProfile.last_name}'s Profile:
        </CardTitle>

        <CardDescription className="pb-4">
          Skill Level: {SampleUserProfile.skill_level}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          {/* Add content as needed */}
        </div>
        <div className="grid gap-2">
          {/* Add content as needed */}
        </div>
        <div className="relative my-4">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 transform">
            <div className="flex items-center justify-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="bg-white px-4 text-xs uppercase text-gray-500">
                {SampleUserProfile.first_name}'s Bio:
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* Display user bio or other relevant information */}
          {SampleUserProfile.bio}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit">
          Message User
        </Button>
		<Button  type="submit">
          View Resume
        </Button>
      </CardFooter>
    </Card>
  );
}