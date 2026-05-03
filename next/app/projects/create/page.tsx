import CreateProject from "./create-project";
import { Suspense } from "react";




/* import { getCreateProjectProps } from "@/app/actions/projects";

async function CreateProfilePage() {
	// const props = await getCreateProjectProps();
	return <CreateProject pageData={props} />;
} */
import { getCreateProjectProps, createProject } from "@/app/actions/projects";
import { CreateProjectProps } from "@/types/projects";

export default async function Page() {
  const props = await getCreateProjectProps();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CreateProject pageData={props as CreateProjectProps} createProjectAction={createProject} />
    </Suspense>
  );
}
