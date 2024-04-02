import { CollaboratorRequest } from "./components/collaborator-request";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Sidebar from "../../components/sidebar";

export default function Page() {
	return (
		<div className="flex " style={{ backgroundColor: "#F0F4F7" }}>
			<Sidebar />

			<div className="w-full rounded-lg p-8">
				<CollaboratorRequest/>
			</div>
		</div>
	);
}
