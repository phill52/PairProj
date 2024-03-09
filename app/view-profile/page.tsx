import { ViewProfile } from "./components/view-profile";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Sidebar from "../../components/sidebar";

export default function Page() {
	return (
		<div className="flex " style={{ backgroundColor: "#F0F4F7" }}>
			<Sidebar />

			<div className="w-full rounded-lg p-8">
				<ViewProfile />
			</div>
		</div>
	);
}
