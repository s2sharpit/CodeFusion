import ProjectsList from "@/components/ProjectsList";
import { ProjectsLoading } from "@/components/suspense";
import { Section, Title } from "@/components/ui";
import { getProjects } from "@/data/getData";
import { shuffle } from "@/utils/shuffle";
import { Suspense } from "react";

export default function page() {
  return (
    <Section className="@container/all">
      <Title>
        Search for <span className="text-highlight">cool</span> Projects
      </Title>
      <Suspense fallback={<ProjectsLoading />}>
        <Projects />
      </Suspense>
    </Section>
  );
}

async function Projects() {
  const projectsData = await getProjects();
  // ! error using in server components, do not uncomment
  // if (!projectsData.projects || projectsData.error) {
  //   toast.error(projectsData.error)
  // }

  const projects = projectsData.projects;

  await shuffle(projects);

  return <ProjectsList projects={projects} />;
}
