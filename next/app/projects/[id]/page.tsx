import { Suspense } from "react";

import ProjectDetails from "./project-details";
import Sidebar from "@/components/sidebar";
import { getProject } from "@/app/actions/projects";

async function ProjectDetailsPage({ params }: { params: { id: string } }) {
	const props = await getProject(params.id);
	return <ProjectDetails project={props} />;
}

export default function Page({ params }: { params: { id: string } }) {
	return (
		<div className="flex " style={{ backgroundColor: "#F0F4F7" }}>
			<Sidebar />
			<div className="w-full rounded-lg p-8">
				<Suspense fallback={<p>Loading...</p>}>
					<ProjectDetailsPage params={params} />
				</Suspense>
				{/* <p>project</p> */}
			</div>
		</div>
	);
}
