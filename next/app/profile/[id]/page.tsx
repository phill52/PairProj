import { ViewProfile } from "../components/profile";
import Sidebar from "../../../components/sidebar";
import { Suspense } from "react";
import { auth } from "@/db/auth";
import { getViewProfileProps } from "../../actions/user";
import { notFound } from "next/navigation";

async function Profile({ id }: { id: string }) {
	if (!id) {
		try {
			const session = await auth();
			if (!session) {
				notFound();
			}
			id = session.user.id;
		} catch (e) {
			console.error(e);
			notFound();
		}
	}

	const profileProps = await getViewProfileProps(id);
	console.log(profileProps);
	if (!profileProps) {
		notFound();
	}
	return <ViewProfile profile={profileProps} />;
}

export default function Page({ params }: { params: { id: string } }) {
	return (
		<div className="flex " style={{ backgroundColor: "#F0F4F7" }}>
			<Sidebar />
			<div className="w-full rounded-lg p-8">
				{/* //TODO: make this a loading skeleton */}
				<Suspense fallback={<p>Loading...</p>}>
					<Profile id={params.id} />
				</Suspense>
			</div>
		</div>
	);
}
