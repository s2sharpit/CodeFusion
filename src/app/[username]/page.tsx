import ProjectsList from "@/components/ProjectsList";
import { DevLoading, ProjectsLoading } from "@/components/suspense";
import { Section } from "@/components/ui";
import { getProjects } from "@/data/getData";
import { auth } from "@/lib/auth";
import { Suspense } from "react";
import AddProject from "@/components/AddProject";
import { toast } from "sonner";
import DevCard from "./DevCard";
import { Metadata } from "next";

type Params = {
  params: { username: string };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const title = params.username[0].toUpperCase() + params.username.slice(1);
  return {
    title: title,
  };
}


export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const session = await auth();
  const isEditable = session?.user?.username === params?.username;
  return (
    <Section className="grid md:grid-cols-[0.8fr_1.3fr] gap-6 @container/dev">
      <Suspense fallback={<DevLoading />}>
        <DevCard paramsUser={params?.username} isEditable={isEditable} />
      </Suspense>
      <Suspense fallback={<ProjectsLoading />}>
        <div className="flex flex-col gap-3">
          {isEditable && <AddProject session={session} />}
          <DevProjects paramsUser={params?.username} />
        </div>
      </Suspense>
    </Section>
  );
}

async function DevProjects({ paramsUser }: { paramsUser: string }) {
  const projectsData = await getProjects();

  // ! error using in server components, do not uncomment
  // if (!projectsData.projects || projectsData.error) {
  //   toast.error(projectsData.error)
  // }

  const devProjects = projectsData?.projects.filter((project) =>
    project.collaborators.some((collab) => collab === paramsUser)
  );

  return <ProjectsList projects={devProjects} />;
}

