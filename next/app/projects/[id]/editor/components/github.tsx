"use client"
import { Octokit } from "octokit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import Key from "./key.tsx"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
//octokit without authentication
const octokit = new Octokit({ 
    
  });


const formSchema = z.object({
    url: z.string().min(1).max(100),
    owner: z.string().min(1).max(100),
    repo: z.string().min(1).max(100),
});



export default function Git(){
    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                url: "",
                owner: "",
                repo: ""
            },
        });

    //const url = "/repos/{owner}/{repo}/issues"
    const get =  async (values: z.infer<typeof formSchema>) => {
        console.log(values.url, values.owner, values.repo);
        try {
            const response = await octokit.request("GET " + values.url, {
                owner: values.owner,
                repo: values.repo,
                per_page: 2
                
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        await get(values);
    };

    return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card>
					<CardHeader className="space-y-1">
                        
						<CardTitle className="text-2xl">Github</CardTitle>
						<CardDescription className="pb-4">
							Push/pull with Github
						</CardDescription>
						{Object.keys(form.formState.errors).length > 0 && (
							<div
								className="border-l-4 border-orange-500 bg-orange-100 p-2 text-sm text-orange-700"
								role="alert"
							>
								<p className="font-medium">
									Error connecting to Github
								</p>
								{Object.values(form.formState.errors).map(
									(error, index) => (
										<p key={index}>{error?.message}</p>
									),
								)}
							</div>
						)}
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="url"
								render={({ field }) => (
									<FormItem>
										<FormLabel>URL</FormLabel>
										<FormControl>
											<Input id="url-text"
												placeholder="/repos/{owner}/{repo}/issues"
												type="url"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
                        <div className="grid gap-2">
							<FormField
								control={form.control}
								name="owner"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Owner</FormLabel>
										<FormControl>
											<Input id="owner-text"
												placeholder="github"
												type="owner"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
                        <div className="grid gap-2">
							<FormField
								control={form.control}
								name="repo"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Repo</FormLabel>
										<FormControl>
											<Input id="repo-text"
												placeholder="docs"
												type="repo"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<Button className="w-full" type="submit">
							Get
						</Button>

					</CardContent>
					<CardFooter>
                        
						
                        
					</CardFooter>
				</Card>
			</form>
		</Form>
	);

}



