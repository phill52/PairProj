import { Suspense } from "react";

import ProjectDetails from "./project-details";
import DemoPage from "./demo";
import Sidebar from "@/components/sidebar";
import { getProject, getProjectOwner, getProjectMembers } from "@/lib/projects";

async function ProjectDetailsPage({ params }: { params: { id: string } }) {
	if (params.id === "demo") {
		const props = await DemoPage();
		return <ProjectDetails project={props} />;
	}

	const project = await getProject(params.id);
	const owner = await getProjectOwner(params.id);
	const members = await getProjectMembers(params.id);
	const props = { ...project, owner, members };
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
