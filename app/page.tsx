import Sidebar from "@/components/sidebar";
import Image from "next/image";

export default function Home() {
	return (
		// Use a flex row instead of flex column
		<div className="flex min-h-screen bg-[#CBD5E1]">
			<Sidebar />
			<main className="flex-grow p-24">
				<div className="flex flex-col items-center">
					<h1 className="mb-10 text-center text-4xl font-bold">
						Welcome to ProgpPair
					</h1>
					<Image
						src="/images/welcome.svg"
						alt="Welcome to ProgPair"
						width={500}
						height={500}
					/>
				</div>
			</main>
		</div>
	);
}
