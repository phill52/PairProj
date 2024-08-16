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
import { signIn } from "next-auth/react";

const formSchema = z.object({
	email: z.string().email().min(1).max(100),
	password: z.string().min(8).max(100),
});

export function CreateAccount() {
	const supabase = createClientSupabase();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const { error } = await supabase.auth.signUp({
				email: values.email,
				password: values.password,
			});
			if (error) {
				console.error("invalid credentials", error);
			} else {
				router.push("/"); // navigate to homepage
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleGithub = async () => {
		// legacy supabase
		// try {
		// 	const { error } = await supabase.auth.signInWithOAuth({
		// 		provider: "github",
		// 	});
		// 	if (error) {
		// 		console.error("Error signing in with GitHub", error);
		// 	} else {
		// 		console.log("signed in with GitHub");
		// 		router.push("/"); // navigate to homepage
		// 	}
		// } catch (e) {
		// 	console.error(e);
		// }
		signIn("github");
	};

	const handleGoogle = async () => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
			});
			if (error) {
				console.error("Error signing in with Google", error);
			} else {
				console.log("signed in with Google");
				router.push("/"); // navigate to homepage
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card>
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl">
							Create an account
						</CardTitle>
						<CardDescription className="pb-4">
							Enter your email below to create your account
						</CardDescription>
						{Object.keys(form.formState.errors).length > 0 && (
							<div
								className="border-l-4 border-orange-500 bg-orange-100 p-2 text-sm text-orange-700"
								role="alert"
							>
								<p className="font-medium">
									Error creating an account
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
							{/* get rid of email/password for now, we'll just ust OAuth
							 <FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="m@example.com"
												type="email"
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
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="********"
												type="password"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/> */}
						</div>
						<div className="relative my-4">
							<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 transform">
								<div className="flex items-center justify-center">
									<div className="flex-grow border-t border-gray-300"></div>
									<span className="bg-white px-4 text-xs uppercase text-gray-500">
										Or continue with
									</span>
									<div className="flex-grow border-t border-gray-300"></div>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-6">
							<Button variant="outline" onClick={handleGithub}>
								<Icons.gitHub className="mr-2 h-4 w-4" />
								Github
							</Button>
							<Button variant="outline" onClick={handleGoogle}>
								<Icons.google className="mr-2 h-4 w-4" />
								Google
							</Button>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full" type="submit">
							Create Account
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
