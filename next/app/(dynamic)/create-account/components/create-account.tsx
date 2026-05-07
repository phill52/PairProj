"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
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
import Image from "next/image";


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
				router.push("/");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleGithub = async () => {
		signIn("github");
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card>
					<CardHeader className="space-y-1 items-center">
					<Image
						src="/images/pairprojlogo.jpg"
						alt="PairProj Logo"
						width={150}
						height={150}
						className="rounded-lg"
					/>
					<CardTitle className="text-2xl text-center">
						Create an account
					</CardTitle>
					
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
							
						</div>
						<div className="relative my-4">
							<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 transform">
								<div className="flex items-center justify-center">
									<div className="flex-grow border-t border-gray-300"></div>
									<span className="bg-white px-4 text-xs uppercase text-gray-500">
										Continue With
									</span>
									<div className="flex-grow border-t border-gray-300"></div>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-6">
							<Button variant="outline" onClick={handleGithub}>
								<Icons.gitHub className="mr-2 h-4 w-4" />
								Github
							</Button>
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}
