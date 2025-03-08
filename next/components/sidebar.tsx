import React from "react";

import Link from "next/link";
import Image from "next/image";
import { Url } from "next/dist/shared/lib/router/router";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";

import { routes } from "@/routes/routes";

type NavBarProps = {
	user: {
		name: string;
		profilepicture: string;
	};
	directmessages: {
		user: {
			name: string;
			profilepicture: string;
			pinned: boolean;
		};
		lastmessage: {
			content: string;
			time: Date;
			read: boolean;
		};
	}[];
	projects: string[];
};

const SampleInput: NavBarProps = {
	user: {
		name: "Taeseo Um",
		profilepicture: "/images/profile.jpg",
	},
	directmessages: [
		{
			user: {
				name: "Rocco Vaccone",
				profilepicture: "/images/profile.jpg",
				pinned: true,
			},
			lastmessage: {
				content: "Hey, how are you?",
				time: new Date("2024-02-20T12:00:00Z"),
				read: false,
			},
		},
		{
			user: {
				name: "Matt Ferguson",
				profilepicture: "/images/profile.jpg",
				pinned: false,
			},
			lastmessage: {
				content: "Let me know when you can start on feature xy",
				time: new Date("2024-02-07T12:00:00Z"),
				read: true,
			},
		},
		{
			user: {
				name: "Steven Lee",
				profilepicture: "/images/profile.jpg",
				pinned: false,
			},
			lastmessage: {
				content: "Hey :)",
				time: new Date("2024-01-15T12:00:00Z"),
				read: true,
			},
		},
	],
	projects: ["Workwind", "ProgPair"],
};

const InitialsFromName = (name: string) => {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("");
};

const MenuItem = ({
	link,
	name,
	icon,
}: {
	link: Url;
	name: string;
	icon: string;
}) => {
	return (
		<div
			className="flex w-[17.5rem]
 cursor-pointer items-center space-x-4 rounded-md px-4 py-2 transition-all ease-linear hover:bg-gray-200 dark:hover:bg-gray-700"
		>
			<Image src={icon} alt={name} width={30} height={30} />
			<Link href={link}>
				<p className="text-md text-black">{name}</p>
			</Link>
		</div>
	);
};

const Divider = () => {
	return <hr className="w-[80%]" />;
};

const Sidebar = () => {
	return (
		<header className="z-50 min-h-screen">
			{/* Hidden checkbox to control the menu */}
			<input type="checkbox" id="menu-toggle" className="hidden" />

			{/* Sidebar */}
			<label htmlFor="menu-toggle" className="cursor-pointer lg:hidden">
				{/* Menu Icon */}
				<span className="block p-4 text-4xl">☰</span>
			</label>
			<div className="sidebar absolute inset-y-0 left-0 flex min-h-screen w-full -translate-x-full transform flex-col items-center space-y-1 bg-white text-white transition duration-200 ease-in-out dark:bg-gray-800 lg:relative lg:translate-x-0">
				<div className="flex flex-col justify-center py-3">
					<h1 className="self-center text-2xl font-bold uppercase text-black">
						ProgPair
					</h1>
				</div>
				<Divider />
				<div className="flex flex-col items-start px-4">
					<MenuItem
						link={routes.projects.search()}
						name="Search Projects"
						icon="/icons/search-light.svg"
					/>
					<MenuItem
						link="/users/search"
						name="Search Users"
						icon="/icons/search-light.svg"
					/>
					<div className="flex w-[17.5rem] cursor-pointer items-center space-x-4 rounded-md px-4 py-2 transition-all ease-linear hover:bg-gray-200 dark:hover:bg-gray-700">
						<Avatar>
							<AvatarImage
								src={SampleInput.user.profilepicture}
							/>
							<AvatarFallback>
								{InitialsFromName(SampleInput.user.name)}
							</AvatarFallback>
						</Avatar>
						<p className="text-md text-black">
							{SampleInput.user.name}
						</p>
					</div>
				</div>
				<Divider />
				<div className="flex flex-col items-center px-4 ">
					<div className="flex">
						<h1 className="text-lg font-bold text-black">
							Direct Messages
						</h1>
					</div>
					<div>
						{SampleInput.directmessages.map((dm) => {
							const messageTime = formatDistanceToNow(
								new Date(dm.lastmessage.time),
								{
									addSuffix: true,
								},
							);
							return (
								<div
									key={dm.user.name}
									className="flex cursor-pointer items-start space-x-4 rounded-md px-4 py-2 transition-all ease-linear hover:bg-gray-200 dark:hover:bg-gray-700"
								>
									<Avatar>
										<AvatarImage
											src={dm.user.profilepicture}
										/>
										<AvatarFallback>
											{InitialsFromName(dm.user.name)}
										</AvatarFallback>
									</Avatar>
									<div className="flex w-[12rem] flex-1">
										<div className="flex min-w-0 flex-1 flex-col">
											<p className="truncate text-xs font-medium text-black">
												{dm.user.name}
											</p>
											<p
												className={`text-2xs truncate text-black ${
													!dm.lastmessage.read
														? "font-bold"
														: "font-normal"
												}`}
											>
												{messageTime} &quot;
												{dm.lastmessage.content}&quot;
											</p>
										</div>
										<div className="right-5 ml-4 flex flex-col justify-between rounded-md transition-all ease-linear hover:bg-gray-400 dark:hover:bg-gray-900">
											<Image
												src={
													dm.user.pinned
														? "/icons/pin-fill-1.svg"
														: "/icons/pin-1.svg"
												}
												alt={
													dm.user.name
														? "Pinned"
														: "Unpinned"
												}
												width={20}
												height={20}
											/>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<Divider />
				<div className="flex w-[17.5rem] flex-col items-start">
					<h1 className="self-center text-lg font-bold text-black">
						Projects
					</h1>
					{/* create a new project */}
					<div className="flex w-full cursor-pointer items-center justify-center space-x-4 rounded-md px-4 py-2 transition-all ease-linear hover:bg-gray-200 dark:hover:bg-gray-700">
						<Image
							src="/icons/plus-svgrepo-com.svg"
							alt="Create New Project"
							width={30}
							height={30}
						/>
						<p className="text-md text-black">Create New Project</p>
					</div>
					<div className="w-full">
						{SampleInput.projects.map((project) => (
							<div
								key={project}
								className="flex w-full cursor-pointer items-center justify-center space-x-4 rounded-md px-4 py-2 transition-all ease-linear hover:bg-gray-200 dark:hover:bg-gray-700"
							>
								<p className="text-md text-black">{project}</p>
							</div>
						))}
					</div>
				</div>
				<Divider />
				<div className="flex w-[17.5rem] cursor-pointer justify-center rounded-md transition-all ease-linear hover:bg-gray-200 dark:hover:bg-gray-700">
					<Image
						className="jusityf-self-start"
						src="/icons/bookmark.svg"
						alt="Saved Projects"
						width={30}
						height={30}
					/>
					<h1 className="py-2 text-lg font-bold text-black">
						Saved Projects
					</h1>
				</div>
			</div>
		</header>
	);
};

export default Sidebar;
