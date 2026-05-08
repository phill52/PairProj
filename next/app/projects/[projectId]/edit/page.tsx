import { notFound } from "next/navigation";
import EditProject from "./edit-project";
import { getProject } from "@/lib/projects";
import db from "@/lib/prisma";

async function getEditProjectPageData() {
	const [areasOfInterest, roles, skills] = await Promise.all([
		db.areaOfInterest.findMany(),
		db.role.findMany(),
		db.skill.findMany(),
	]);

	return {
		areasOfInterest,
		roles,
		skills,
	};
}

export default async function Page({
	params,
}: {
	params: { projectId: string };
}) {
	const project = await getProject(params.projectId);

	if (!project) {
		notFound();
	}

	const pageData = await getEditProjectPageData();

	return (
		<EditProject
			project={project}
			pageData={pageData}
		/>
	);
}