"use client"
import { Octokit } from "octokit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
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



const formSchema = z.object({
    token: z.string().min(1).max(100),
    
});

export default function Key(){
    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                token: ""
            },
        });

    //const url = "/repos/{owner}/{repo}/issues"
	const get_token = async (values: z.infer<typeof formSchema>) => {
        return values.token;
    };

    const set_token =  async (values: z.infer<typeof formSchema>) => {
        console.log(values.token);
    };

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        await set_token(values);
    };

    return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card>
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl">Github</CardTitle>
						<CardDescription className="pb-4">
							Connect to Github
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
								name="token"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Token</FormLabel>
										<FormControl>
											<Input id="token-text"
												placeholder="******************"
												type="token"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
                        
                        
						
					</CardContent>
					<CardFooter>
                        
						<Button className="w-full" type="submit">
							Connect
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);

}



