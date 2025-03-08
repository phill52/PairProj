"use client";
import { useState, Dispatch, SetStateAction } from "react";
import FilterBar from "./components/filter-bar";
import ProjectCard from "./components/project-card";
import { FiltersProvider } from "./FiltersContext";

export default function Page() {
	return (
		<FiltersProvider>
			<div
				className="md:flex md:flex-col md:items-center min-h-screen"
				style={{ backgroundColor: "#F0F4F7" }}
			>
				<div className="w-full max-w-7xl px-4 pt-4 lg:px-8">
					<FilterBar />
				</div>
				<div className="">
					<ProjectCard />
				</div>
			</div>
		</FiltersProvider>
	);
}
