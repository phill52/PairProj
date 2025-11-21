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
import { createClientSupabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function SignIn() {
	const supabase = createClientSupabase();
	const router = useRouter();

	const handleGithub = async () => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "github",
			});
			if (error) {
				console.error("Error signing in with GitHub", error);
			} else {
				console.log("signed in with GitHub");
				router.push("/"); // navigate to homepage
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Card>
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Welcome Back</CardTitle>
				<CardDescription className="pb-4">
					Sign in with your GitHub account to continue
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="grid grid-cols-1 gap-6">
					<Button variant="outline" onClick={handleGithub}>
						<Icons.gitHub className="mr-2 h-4 w-4" />
						Sign In with GitHub
					</Button>
				</div>
			</CardContent>
			<CardFooter>
			</CardFooter>
		</Card>
	);
}
