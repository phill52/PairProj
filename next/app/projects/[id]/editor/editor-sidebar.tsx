import React from "react";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { Url } from "next/dist/shared/lib/router/router";
import File_Upload from "./components/file_uploader";


const Divider = () => {
	return <hr className="w-[80%]" />;
};

function EditorSidebar ({}) {

	return (
		<header className="z-50 min-h-screen">
			<input type="checkbox" id="menu-toggle" className="hidden" />

			<label htmlFor="menu-toggle" className="cursor-pointer lg:hidden">
				<span className="block p-4 text-4xl">☰</span>
			</label>
			<div className="sidebar absolute inset-y-0 left-0 flex w-full -translate-x-full transform flex-col items-center space-y-1 bg-gray-100 text-white transition duration-200 ease-in-out dark:bg-gray-800 lg:relative lg:translate-x-0">
				<div className="flex flex-col justify-center py-3">
					<h1 className="self-center text-2xl font-bold uppercase text-black">
						PairProj Editor
					</h1>
				</div>

				<Divider />

				<div className="flex w-[17.5rem] flex-col items-start">
					<h1 className="self-center text-lg font-bold text-black">
						Active Users
					</h1>
					<div className="flex w-full cursor-pointer items-center justify-center space-x-4 rounded-md px-4 py-2 transition-all ease-linear hover:bg-gray-200 dark:hover:bg-gray-700">
					
					</div>
				</div>

				<Divider />
			</div>
		</header>
	);
};

export default EditorSidebar;
