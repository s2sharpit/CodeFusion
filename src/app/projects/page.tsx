import ProjectsList from "@/components/ProjectsList";
import SearchFilter from "@/components/SearchFilter";
import { ProjectsLoading } from "@/components/suspense";
import { Section, Title, Wrapper } from "@/components/ui";
import { getProjects } from "@/data/getData";
import { projectsFilter } from "@/data/projectsFilter";
import { shuffle } from "@/utils/shuffle";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projects",
};

type Params = {
  search?: string;
  filter?: string;
  filters?: string[];
};

export default function page({ searchParams }: { searchParams?: Params }) {
  const filter = searchParams?.filter?.split(",") || [];

  return (
    <Section className="@container/all">
      <Title>
        Search for <span className="text-highlight">cool</span> Projects
      </Title>
      <Wrapper className="md:grid-cols-[14rem_calc(100%-17rem)] md:gap-12 place-items-start">
        <SearchFilter available={projectsFilter} />
        <Suspense fallback={<ProjectsLoading />}>
          <Projects search={searchParams?.search ?? ""} filters={filter} />
        </Suspense>
      </Wrapper>
    </Section>
  );
}

async function Projects({ search, filters = [] }: Params) {
  const projectsData = await getProjects();
  // ! error using in server components, do not uncomment
  // if (!projectsData.projects || projectsData.error) {
  //   toast.error(projectsData.error)
  // }

  const projects = projectsData.projects;

  await shuffle(projects);

  const searchProjects = projects.filter((project) => {
    const username = project.username.toLowerCase();
    const title = String(project?.title).toLowerCase();
    const searchLower = search?.toLowerCase() ?? "";
    return (
      username.includes(searchLower) ||
      title.includes(searchLower) ||
      project.topics.some((topic) =>
        topic.toLowerCase().includes(searchLower)
      ) ||
      project.languages.some((lang) => lang.toLowerCase().includes(searchLower))
    );
  });

  const filteredProjects =
    filters.length === 0
      ? searchProjects
      : searchProjects.filter(
          (dev) =>
            dev.topics.some((topic) => filters.includes(topic.toLowerCase())) ||
            dev.languages.some((lang) => filters.includes(lang.toLowerCase()))
        );

  return <ProjectsList projects={filteredProjects} />;
}
