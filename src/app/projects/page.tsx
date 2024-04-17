import { Section, Title, Wrapper } from "@/components/ui";
import { getProjects } from "@/lib/getData";
import { shuffle } from "@/utils/shuffle";
import Link from "next/link";

export default async function page() {
  const projects = await getProjects();
  const shuffledUsers: Project[] = await shuffle(projects);
  return (
    <Section>
      <Title>
        Search for <span className="text-primary">cool</span> Projects
      </Title>
      <Wrapper className="sm:grid-cols-2 lg:grid-cols-3 grid md:gap-8">
        {shuffledUsers.map((proj) => (
          <ProjectCard key={proj?.title} proj={proj} />
        ))}
      </Wrapper>
    </Section>
  );
}

function ProjectCard({ proj }: { proj: Project }) {
  return (
    <Link
      href={`/${proj?.repo}`}
      className="p-4 border border-gray-700 hover:border-primary rounded-lg w-full h-full"
    >
      <h1 className="text-white text-lg font-bold line-clamp-1">
        {proj?.title}
      </h1>
      <p className="line-clamp-2 h-10 text-sm">{proj?.description}</p>
      <div className="flex gap-x-2 capitalize text-xs overflow-x-auto py-2">
        {proj?.tags.map((tag) => (
          <span
            key={tag}
            className="bg-zinc-900/80 border border-gray-700/50 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <hr className="pt-4 border-gray-800" />
      <div className="flex gap-x-4 uppercase text-xs font-bold overflow-x-auto">
        {proj?.techStacks.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </Link>
  );
}
