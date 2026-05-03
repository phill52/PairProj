import FilterBar from "./components/filter-bar";
import ProjectCard from "./components/project-card";
import { FiltersProvider } from "./FiltersContext";
import { getProjects } from "@/app/actions/projects";

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		skills?: string;
		difficulty?: string;
		query?: string;
		status?: string;
		team?: string;
	};
}) {
	const skills = searchParams?.skills
		? searchParams.skills.split(",")
		: undefined;

	const difficulty = searchParams?.difficulty || undefined;
	const query = searchParams?.query || undefined;
	const status = searchParams?.status || undefined;
	const team = searchParams?.team || undefined;

	const projects = await getProjects({
		skills,
		difficulty,
		query,
		status,
		team,
	});

	return (
		<FiltersProvider>
			<div
				className="md:flex md:flex-col md:items-center min-h-screen"
				style={{ backgroundColor: "#F0F4F7" }}
			>
				<div className="w-full max-w-7xl px-4 pt-4 lg:px-8">
					<FilterBar />
				</div>

				<div>
					<ProjectCard projects={projects} />
				</div>
			</div>
		</FiltersProvider>
	);
}