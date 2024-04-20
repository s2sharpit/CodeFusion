import ProjectsList from "@/components/ProjectsList";
import { ProjectsLoading } from "@/components/suspense";
import { Section, Title } from "@/components/ui";
import { getProjects } from "@/lib/getData";
import { shuffle } from "@/utils/shuffle";
import { Project } from "@prisma/client";
import { Suspense } from "react";

export default function page() {
  return (
    <Section className="@container/all">
      <Title>
        Search for <span className="text-primary">cool</span> Projects
      </Title>
      <Suspense fallback={<ProjectsLoading />}>
        <Projects />
      </Suspense>
    </Section>
  );
}

async function Projects() {
  const projects: Project[] = await getProjects();
  await shuffle(projects);

  return <ProjectsList projects={projects} />;
}
