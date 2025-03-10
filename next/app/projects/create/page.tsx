import CreateProject from "./create-project";
import { Suspense } from "react";
import { getCreateProjectProps } from "@/app/actions/projects";

async function CreateProfilePage() {
	const props = await getCreateProjectProps();
	return <CreateProject pageData={props} />;
}

export default function Page() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<CreateProfilePage />
		</Suspense>
	);
}
