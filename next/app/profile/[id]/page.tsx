import Sidebar from "../../../components/sidebar";
import { ViewProfile } from "./../components/profile";
import { ProfileActions } from "./../components/profileActions";
import { Suspense } from "react";
import { example } from "./../components/example";


function Profile() {
	return <ViewProfile profile={example} />;
}

export default function Page({
  params,
}: {
  params: { id: string };
}) {

  const currentUserId = "user_1";
  const isSelf = params.id === currentUserId;

  console.log("Viewing profile:", params.id);

  return (
    <div className="flex" style={{ backgroundColor: "#F0F4F7" }}>
      <Sidebar />
      <div className="w-full rounded-lg p-8">
        <ProfileActions isSelf={isSelf} />
        <Suspense fallback={<p>Loading...</p>}>
          <Profile />
        </Suspense>
      </div>
    </div>
  );
}