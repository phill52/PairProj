import Sidebar from "../../../components/sidebar";
import { ViewProfile } from "./../components/profile";
import { ProfileActions } from "./../components/profileActions";
import { Suspense } from "react";
import { getUser } from "@/lib/users"; 
import { auth } from "@/lib/auth";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const isSelf = currentUserId === params.id;

  const profile = await getUser(params.id);

  return (
    <div className="flex" style={{ backgroundColor: "#F0F4F7" }}>
      <Sidebar />
      <div className="w-full rounded-lg p-8">
        <ProfileActions isSelf={isSelf} />
        <Suspense fallback={<p>Loading...</p>}>
          <ViewProfile profile={profile} isSelf={isSelf} />
        </Suspense>
      </div>
    </div>
  );
}