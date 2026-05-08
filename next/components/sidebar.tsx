import React from "react";

import Link from "next/link";
import Image from "next/image";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { auth } from "@/lib/auth";
import { getUser } from "@/lib/users";

import { routes } from "@/routes/routes";

const InitialsFromName = (name: string) => {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("");
};

const Divider = () => {
	return <hr className="w-[80%]" />;
};

const Sidebar = async () => {
	const session = await auth();
	const currentUserId = session?.user?.id;
	const profile = currentUserId
		? await getUser(currentUserId).catch(() => null)
		: null;

	const userName = profile?.name ?? session?.user?.name ?? "User";
	const profilePicture = profile?.image ?? "/images/profile.jpg";
	const userProjects =
		profile?.projectContributions.map((c) => ({
			id: c.project.id,
			name: c.project.name,
		})) ?? [];

	return (
		<header className="z-50 min-h-screen">
			<div className="sidebar absolute inset-y-0 left-0 flex min-h-screen w-full -translate-x-full transform flex-col items-center space-y-1 bg-white text-white transition duration-200 ease-in-out lg:relative lg:translate-x-0 dark:bg-gray-800">
				<div className="flex flex-col justify-center py-3">
					<Link href={routes.home()} aria-label="Go to home page">
						<Image
							src="/images/pairprojlogo.jpg"
							alt="PairProj Logo"
							width={150}
							height={150}
						/>
					</Link>
				</div>
				<Divider />
				<div className="flex flex-col items-start px-4">
					<Link
						href={
							currentUserId
								? routes.users.profile({ id: currentUserId })
								: routes.home()
						}
						className="flex w-[17.5rem] cursor-pointer items-center space-x-4 rounded-md px-4 py-2 transition-all ease-linear hover:bg-gray-200 dark:hover:bg-gray-700"
					>
						<Avatar>
							<AvatarImage src={profilePicture} />
							<AvatarFallback>
								{InitialsFromName(userName)}
							</AvatarFallback>
						</Avatar>
						<p className="text-md text-black">{userName}</p>
					</Link>
				</div>
				<Divider />
				<div className="flex w-[17.5rem] flex-col items-start">
					<h1 className="self-center text-lg font-bold text-black">
						Explore Projects
					</h1>
					<Link
						href={routes.projects.create()}
						className="flex w-full cursor-pointer items-center space-x-4 rounded-md px-4 py-2 transition-all ease-linear hover:bg-gray-200 dark:hover:bg-gray-700"
					>
						<Image
							src="/icons/plus-svgrepo-com.svg"
							alt="Create New Project"
							width={30}
							height={30}
						/>
						<p className="text-md text-black">Create New Project</p>
					</Link>
					<Link
						href={routes.projects.search()}
						className="flex w-full cursor-pointer items-center space-x-4 rounded-md px-4 py-2 transition-all ease-linear hover:bg-gray-200 dark:hover:bg-gray-700"
						aria-label="Search projects"
					>
						<Image
							src="/icons/search-light.svg"
							alt="Search Projects"
							width={30}
							height={30}
						/>
						<p className="text-md text-black">Search Projects</p>
					</Link>
				</div>
				<Divider />
				<div className="flex w-[17.5rem] flex-col items-start">
					<h1 className="self-center text-lg font-bold text-black">
						Your Projects
					</h1>
					<div className="w-full">
						{userProjects.map((project) => (
							<Link
								key={project.id}
								href={routes.projects.project({
									id: project.id,
								})}
								className="flex w-full cursor-pointer items-center justify-center space-x-4 rounded-md px-4 py-2 transition-all ease-linear hover:bg-gray-200 dark:hover:bg-gray-700"
							>
								<p className="text-md text-black">
									{project.name}
								</p>
							</Link>
						))}
						{userProjects.length === 0 && (
							<div className="flex w-full items-center justify-center px-4 py-2">
								<p className="text-sm text-gray-500">
									No projects yet
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Sidebar;
