import CreateProject from "./create-project";
import { Suspense } from "react";




/* import { getCreateProjectProps } from "@/app/actions/projects";

async function CreateProfilePage() {
	// const props = await getCreateProjectProps();
	return <CreateProject pageData={props} />;
} */
import { CreateProjectProps } from "@/types/projects";


const fallbackProps: CreateProjectProps = {
	roles: [],
	skills: [],
	areasOfInterest: [],
};

export default function Page() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<CreateProject pageData={fallbackProps} />
		</Suspense>
	);
}
