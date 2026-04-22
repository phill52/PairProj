import Sidebar from "@/components/sidebar";
import MessagePopup from "@/components/messagePopup";
import Image from "next/image";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { getUser } from "@/lib/users";
import { routes } from "@/routes/routes";
import { getRelevantProjects } from "@/lib/projects";

export default async function Home() {
	const session = await auth();
	const currentUser = session?.user;
	const profile = currentUser?.id ? await getUser(currentUser.id) : null;
	const projectContributions = profile?.projectContributions || [];

	const relevantProjects = await getRelevantProjects(currentUser?.id || "");
	

	return (
		// Use a flex row instead of flex column
		<div className="flex min-h-screen bg-[#f0f4f7]">
			<Sidebar />
			<main className="flex-grow p-24">
				<div className="flex flex-col items-start">
					<h1 className="mb-10 text-left text-4xl font-bold">
						Welcome
						{currentUser?.name ? ` ${currentUser.name}` : ""}
					</h1>
					<div className="w-full max-w-4xl">
						<h3 className="mb-2 text-4xl font-bold">
							Your Projects
						</h3>
						{projectContributions.map((m) => {
							const project = m.project;
							return (
								<div
									key={project.id}
									className="mb-4 w-full rounded-lg border border-black p-6"
								>
									<Link
										href={routes.projects.project({
											id: project.id,
										})}
										className="group flex cursor-pointer flex-row"
									>
										<div>
											<h3 className="text-2xl font-bold group-hover:underline">
												{project.name}
											</h3>
											<p>{project.description}</p>
											<p className="mt-2 text-sm font-medium text-slate-700">
												Role: {m.role?.name ?? "Member"}
											</p>
										</div>
									</Link>
								</div>
							);
						})}
					</div>
					<br/>
					<div className="w-full max-w-4xl">
						<h3 className="mb-2 text-4xl font-bold">
							Relevant Projects
						</h3>
						{relevantProjects.map((project) => {
							return (
								<div
									key={project.id}
									className="mb-4 w-full rounded-lg border border-black p-6"
								>
									<Link
										href={routes.projects.project({
											id: project.id,
										})}
										className="group flex cursor-pointer flex-row"
									>
										<div>
											<h3 className="text-2xl font-bold group-hover:underline">
												{project.name}
											</h3>
											<p>{project.description}</p>
											<div className="mt-2 text-sm text-slate-700">
												<p className="font-medium">Role Matches:</p>
												<ul className="list-disc pl-5">
													{project.roles.map((role) => (
														<li key={role.id}>
															<span className="font-medium">{role.name}</span>: {role.matchingSkills.map((skill) => skill.name).join(", ")}
														</li>
													))}
												</ul>
											</div>
										</div>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
				<div className="absolute bottom-0 right-24">
					{/* <MessagePopup /> */}
				</div>
			</main>
		</div>
	);
}
