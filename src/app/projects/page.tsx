import { ProjectsLoading } from "@/components/suspense";
import { Section, Title, Wrapper } from "@/components/ui";
import { getProjects } from "@/lib/getData";
import { shuffle } from "@/utils/shuffle";
import { Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LuExternalLink } from "react-icons/lu";

export default function page() {
  return (
    <Section>
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

  return (
    <Wrapper className="sm:grid-cols-2 lg:grid-cols-3 grid md:gap-8">
      {projects.map((proj) => (
        <div key={proj.title} className="p-4 border border-gray-700 hover:border-primary rounded-lg w-full h-full relative">
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
          <div className="absolute top-2 right-10 flex">
            {proj?.collaborators.slice(0, 2).map((collab, i) => (
              <div key={collab.username} className="-ml-5">
                <Image
                  src={`https://github.com/${collab.username}.png`}
                  alt={proj.username}
                  width={32}
                  height={32}
                  className="rounded-full border border-gray-800"
                />
              </div>
            ))}
            {proj?.collaborators.length > 2 && (
              <div className="-ml-5">
                <span className="rounded-full border border-gray-800 w-8 h-8 flex items-center justify-center text-white backdrop-blur-lg bg-black/50 text-sm">
                  +{proj?.collaborators.length - 2}
                </span>
              </div>
            )}
          </div>
          <Link
            href={proj.repo}
            // target="_blank"
            rel="noreferrer"
            className="absolute top-0 right-2"
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
      ))}
    </Wrapper>
  );
}
