"use client";
import { useState, Dispatch, SetStateAction } from "react";
import FilterBar from "./components/filter-bar";
import ProjectCard from "./components/project-card";
import { FiltersProvider } from "./FiltersContext";
import Sidebar from "@/components/sidebar";

export default function Page() {
  return (
    <FiltersProvider>
      <div
        className="md:flex min-h-screen"
        style={{ backgroundColor: "#F0F4F7" }}
      >
        {/* Include the Sidebar component */}
        <div className="fixed w-64 h-full overflow-y-auto">
          <Sidebar />
        </div>
        
        <div className="md:flex md:flex-col md:items-center w-full pl-64">
          <div className="w-full max-w-7xl px-4 pt-4 lg:px-8">
            <FilterBar />
          </div>
          <div>
            <ProjectCard />
          </div>
        </div>
      </div>
    </FiltersProvider>
  );
}
