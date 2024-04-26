"use client";
import ProjectDetails from "./components/project-details";

export default function Page() {
	return (
        <div
            className="md:flex md:flex-col md:items-center min-h-screen"
            style={{ backgroundColor: "#F0F4F7" }}
        >
        <div className="">
            <ProjectDetails />
        </div>
        </div>
	);
}