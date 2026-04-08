import { Suspense } from "react";

import ProjectDetails from "./project-details";
import DemoPage from "./demo";
import Sidebar from "@/components/sidebar";
import { auth } from "@/lib/auth";
import { getProject, getProjectOwner, getProjectMembers, getRolesAppliedTo } from "@/lib/projects";

async function ProjectDetailsPage({ params }: { params: { projectId: string } }) {
	if (params.projectId === "demo") {
		const props = await DemoPage();
		return <ProjectDetails project={props} />;
	}

	const session = await auth();
	const currentUserId = session?.user.id;

	const project = await getProject(params.projectId);
	const owner = await getProjectOwner(params.projectId);
	const members = await getProjectMembers(params.projectId);
	const rolesAppliedTo = currentUserId ? await getRolesAppliedTo(params.projectId, currentUserId) : [];
	const props = { ...project, owner, members, rolesAppliedTo };
	return <ProjectDetails project={props} />;
}

export default function Page({ params }: { params: { projectId: string } }) {
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
