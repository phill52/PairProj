import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		// Use a flex row instead of flex column
		<div className="flex min-h-screen bg-[#f0f4f7]">
			<main className="flex-grow p-24">
				<div className="flex flex-col items-center">
					<h1 className="mb-10 text-center text-5xl font-bold">
						Pair Proj Landing Currently Under Construction
					</h1>
                            <a href="/create-account">
                    <Button>Create Account</Button>
                  </a>
				</div>
			</main>
		</div>
	);
}