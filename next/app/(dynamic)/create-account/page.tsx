import { CreateAccount } from "./components/create-account";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { auth } from "@/db/auth";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (session) {
		console.log(session);

		redirect("/");
	} else {
		return (
			<div
				className="flex h-screen flex-col"
				style={{ backgroundColor: "#F0F4F7" }}
			>
				<div className="flex items-center justify-between bg-white px-5 py-3 shadow-sm">
					<div className="text-3xl">ProgPair</div>
					<a href="/login">
						<Button>Sign In</Button>
					</a>
				</div>
				<span className="hidden md:block">
					<div
						className="absolute left-0 top-0 h-screen w-3/4 drop-shadow-lg"
						style={{
							top: "3.75rem",
							backgroundColor: "#EEF9FF",
							height: "calc(100vh - 3.75rem)",
						}}
						id="line"
					></div>
					<div
						className="absolute left-1/3 ml-56 mt-8 aspect-[1] w-full rounded-full drop-shadow-[3px_0_1px_rgba(0,0,0,0.25)] md:max-w-[668px]"
						style={{ backgroundColor: "#EEF9FF" }}
						id="circle"
					></div>
					<Image
						src="/images/create-account-bg.svg"
						alt="create account background"
						width={683}
						height={488}
						className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
						style={{ left: "28%" }}
					/>
				</span>

				<div className="flex h-screen flex-col items-center justify-center">
					<div className="sm: -mt-40 w-full max-w-2xl rounded-lg p-8 md:-mt-12 md:ml-20 md:translate-x-1/2">
						<CreateAccount />
					</div>
				</div>
			</div>
		);
	}
}
