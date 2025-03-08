"use client";
import ProjectDetails from "./project-details";

export default function Page() {
	return (
		<div
			className="min-h-screen md:flex md:flex-col md:items-center"
			style={{ backgroundColor: "#F0F4F7" }}
		>
			<div className="">
				<ProjectDetails />
			</div>
		</div>
	);
}
