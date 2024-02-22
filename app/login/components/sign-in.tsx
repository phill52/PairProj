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
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientSupabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignIn() {
	const supabase = createClientSupabase();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) {
				console.error("invalid credentials", error);
				setError(true);
			} else {
				console.log("logged in");
				setEmail("");
				setPassword("");
				router.push("/"); // navigate to homepage
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Card>
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Welcome Back</CardTitle>
					<CardDescription className="pb-4">
						Enter your email below to sign in to your account
					</CardDescription>
					{error && (
						<div
							className="border-l-4 border-orange-500 bg-orange-100 p-2 text-sm text-orange-700"
							role="alert"
						>
							<p className="font-medium">Error logging in</p>
							<p>Invalid credentials</p>
						</div>
					)}
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
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
						<Button variant="outline">
							<Icons.gitHub className="mr-2 h-4 w-4" />
							Github
						</Button>
						<Button variant="outline">
							<Icons.google className="mr-2 h-4 w-4" />
							Google
						</Button>
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-full" type="submit">
						Sign In
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
