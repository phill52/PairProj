import Sidebar from "../../../components/sidebar";
import { ViewProfile } from "./../components/profile";
import { ProfileActions } from "./../components/profileActions";
import { Suspense } from "react";
import { getUser } from "@/lib/users"; 

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const currentUserId = "user_1";
  const isSelf = params.id === currentUserId;

  console.log("Viewing profile:", params.id);

  const profile = await getUser(params.id);

  return (
    <div className="flex" style={{ backgroundColor: "#F0F4F7" }}>
      <Sidebar />
      <div className="w-full rounded-lg p-8">
        <ProfileActions isSelf={isSelf} />
        <Suspense fallback={<p>Loading...</p>}>
          <ViewProfile profile={profile} />
        </Suspense>
      </div>
    </div>
  );
}