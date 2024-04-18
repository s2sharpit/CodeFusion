import { Section, Title, Wrapper } from "@/components/ui";
import { getProjects } from "@/lib/getData";
import { shuffle } from "@/utils/shuffle";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

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
    <div
      className="p-4 border border-gray-700 hover:border-primary rounded-lg w-full h-full relative"
    >
      <h1 className="text-white text-lg font-bold line-clamp-1">
        {proj?.title}
      </h1>
      <p className="line-clamp-2 h-10 text-sm">{proj?.description}</p>
      <div className="flex gap-x-2 capitalize text-xs overflow-x-auto py-2">
        {proj?.tags.map((tag) => (
          <span
            key={tag}
            className="bg-zinc-900/80 border border-gray-700/50 px-2 py-0.5 rounded-full text-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={proj.repo}
        // target="_blank"
        rel="noreferrer"
        className="absolute top-0 right-1.5"
      >
        <div className="inline-flex h-10 items-center rounded-lg font-extrabold text-[2rem] hover:scale-110 transition-all duration-300 ease-in-out  hover:text-primary">
          <LuExternalLink size={21} />
        </div>
      </Link>
      <hr className="pt-4 border-gray-800" />
      <div className="flex gap-x-4 uppercase text-xs font-bold overflow-x-auto text-nowrap">
        {proj?.techStacks.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </div>
  );
}
