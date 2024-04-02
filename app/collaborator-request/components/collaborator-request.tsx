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

type RequestData = {
	requests: string[][];
};

const SampleRequestData: RequestData = {
	requests: [["Justus Neumeister","Hi, I would like to like to join the team!", "./images/profile.jpg"],["TaeSeo Um","Let me in!","./images/LetMeIn.png"],["Marshawn Lynch","I'm just here so I don't get fined","./images/Marshawn.png"]]
};

export function CollaboratorRequest() {
	const supabase = createClientSupabase();
	const router = useRouter();

	return (
		<div className="">
			<Card className=" p-10">
			<Button className="text-black mb-5" style={{backgroundColor: 'transparent', float:'left'}}>X</Button>
			<div className="flex gap-5 items-center justify-center ">
				
				<span className="font-bold textAlign-center mb-8 " style={{fontSize: "3rem", textAlign: "center"}}>
				Collaborator Requests
				</span>
				<br/>

			</div>
			

			<Button className="text-black mb-2 w-full" style={{backgroundColor: 'transparent'}}>Search Bar</Button>

			<Card className="mb-4" style={{ backgroundColor: '#f0f0f0', }}>
				<CardHeader className="flex">
					<div className="flex items-center gap-5">
						<img
							src={SampleRequestData.requests[0][2]}
							alt="User Image"
							className="w-1/6 mb-4 rounded-full p-2 w-1 width-10"
							style={{ width: '1', height:'5'}}
						/>
						<div className="w-full">
							<span className="text-lg font-bold" style={{ fontSize: "1.5rem" }}>{SampleRequestData.requests[0][0]}</span>
							


							<br/>
							<div className="w-full">
								
								<div>
									<Button className="w-fullfloat-right rounded-full bg-red-400 p-2 text-white"  style={{ float: "right" }}>Deny</Button>
									<Button className="w-fullfloat-right rounded-full bg-green-400 p-2 text-white"  style={{ float: "right" }}>Accept</Button>
								</div>
								<span className="" style={{ fontSize: "1rem" }}>{SampleRequestData.requests[0][1]}</span>
								
							</div>
							
						</div>
					
					</div>
					
				</CardHeader>

			</Card>

			<Card className="mb-4" style={{ backgroundColor: '#f0f0f0', }}>
				<CardHeader className="flex">
					<div className="flex items-center gap-5">
						<img
							src={SampleRequestData.requests[1][2]}
							alt="User Image"
							className="w-1/6 mb-4 rounded-full p-2 w-1 width-10"
							style={{ width: '1', height:'5'}}
						/>
						<div className="w-full">
							<span className="text-lg font-bold" style={{ fontSize: "1.5rem" }}>{SampleRequestData.requests[1][0]}</span>
							


							<br/>
							<div className="w-full">
								
								<div>
									<Button className="w-fullfloat-right rounded-full bg-red-400 p-2 text-white"  style={{ float: "right" }}>Deny</Button>
									<Button className="w-fullfloat-right rounded-full bg-green-400 p-2 text-white"  style={{ float: "right" }}>Accept</Button>
								</div>
								<span className="" style={{ fontSize: "1rem" }}>{SampleRequestData.requests[1][1]}</span>
								
							</div>
							
						</div>
					
					</div>
					
				</CardHeader>

			</Card>

			<Card className="" style={{ backgroundColor: '#f0f0f0', }}>
				<CardHeader className="flex">
					<div className="flex items-center gap-5">
						<img
							src={SampleRequestData.requests[2][2]}
							alt="User Image"
							className="w-1/6 mb-4 rounded-full p-2 w-1 width-10"
							style={{ width: '1', height:'5'}}
						/>
						<div className="w-full">
							<span className="text-lg font-bold" style={{ fontSize: "1.5rem" }}>{SampleRequestData.requests[2][0]}</span>
							


							<br/>
							<div className="w-full">
								
								<div>
									<Button className="w-fullfloat-right rounded-full bg-red-400 p-2 text-white"  style={{ float: "right" }}>Deny</Button>
									<Button className="w-fullfloat-right rounded-full bg-green-400 p-2 text-white"  style={{ float: "right" }}>Accept</Button>
								</div>
								<span className="" style={{ fontSize: "1rem" }}>{SampleRequestData.requests[2][1]}</span>
								
							</div>
							
						</div>
					
					</div>
					
				</CardHeader>

			</Card>
			</Card>
			
		</div>
	);
}
