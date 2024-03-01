import { ViewProfile } from "./components/view-profile";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Sidebar from "../../components/sidebar";

export default function Page() {
  return (
    <div
      className="flex "
      style={{ backgroundColor: "#F0F4F7" }}
    >
      <Sidebar />

        


      <div >
        <div className="w-full p-8 rounded-lg md:translate-x-1/4 md:-mt-4 md:ml-20 sm: -mt-40">
          <ViewProfile />
        </div>
      </div>
    </div>
  );
}
