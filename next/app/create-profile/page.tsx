import CreateProfile from "./create-profile";
import { getCreateProfileProps } from "../actions/user";
import { Suspense } from "react";

async function CreateProfilePage() {
	const props = await getCreateProfileProps();
	console.log(props);
	console.log(props.profile.account_type);
	return <CreateProfile pageData={props} />;
}

export default function Page() {
	return (
		//TODO: make this a loading skeleton
		<Suspense fallback={<p>Loading...</p>}>
			<CreateProfilePage />
		</Suspense>
	);
}
