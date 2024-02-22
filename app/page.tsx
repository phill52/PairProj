import Image from "next/image";
import Sidebar from "@/components/sidebar";

export default function Home() {
    return (
        // Use a flex row instead of flex column
        <div className="flex min-h-screen bg-[#CBD5E1]">
            <Sidebar />
            <main className="flex-grow p-24">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold text-center mb-10">
                        Welcome to ProgpPair
                    </h1>
                    <Image
                        src="/images/welcome.svg"
                        alt="Welcome to ProgpPair"
                        width={500}
                        height={500}
                    />
                </div>
            </main>
        </div>
    );
}
