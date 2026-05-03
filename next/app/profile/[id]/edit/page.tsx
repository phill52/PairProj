import { EditProfile } from "./../../components/editProfile";
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
    {(isSelf) && (
        <div className="w-full rounded-lg p-8">
            <Suspense fallback={<p>Loading...</p>}>
                <EditProfile profile={profile} />
            </Suspense>
        </div>
    )}
    {(!isSelf) && (
        <div className="w-full rounded-lg p-8">
          <Suspense fallback={<p>Loading...</p>}>
            <ViewProfile profile={profile} isSelf={isSelf} />
          </Suspense>
        </div>
    )}
    </div>
  );
}
