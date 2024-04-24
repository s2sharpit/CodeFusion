import { Badge, Subtle, Wrapper } from "@/components/ui";
import { Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

export default function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <>
      {projects.length > 0 ? (
        <Wrapper className="place-items-start md:gap-6 @xs/dev:mt-0 @xs/all:sm:grid-cols-2 @xs/all:lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg w-full p-4 hover:border-highlight border border-border"
            >
              <div className="border-b border-border @xs/dev:p-4 @xs/all:pb-2 relative">
                <h3 className="text-primary capitalize text-lg/5 font-bold basis-full line-clamp-1">
                  {project.title}
                </h3>
                <p className="pr-2 text-[.9rem] my-2 @xs/all:h-11 xsm:mx-0 mr-4 line-clamp-2 @xs/all:text-sm">
                  {project.description}
                </p>
                <div className="flex gap-x-2 capitalize text-xs overflow-x-auto @xs/dev:pt-2">
                  {project?.topics.map((topic) => (
                    <Badge variant="secondary" key={topic}>
                      {topic}
                    </Badge>
                  ))}
                </div>
                <div className="absolute -top-1 @xs/all:-top-1.5 right-9 flex">
                  {project?.collaborators.slice(0, 2).map((collab, i) => (
                    <div key={collab} className="-ml-5">
                      <Image
                        src={`https://github.com/${collab}.png`}
                        alt={collab}
                        width={32}
                        height={32}
                        className="rounded-full border border-border"
                      />
                    </div>
                  ))}
                  {project?.collaborators.length > 2 && (
                    <div className="-ml-5">
                      <span className="rounded-full border border-border w-8 h-8 flex items-center justify-center text-primary backdrop-blur-lg bg-background/50 text-sm">
                        +{project?.collaborators.length - 2}
                      </span>
                    </div>
                  )}
                </div>
                <Link
                  href={project.repo}
                  // target="_blank"
                  rel="noreferrer"
                  className="absolute -top-2.5 -right-1"
                >
                  <div className="inline-flex h-10 items-center rounded-lg font-extrabold text-[2rem] hover:scale-110 transition-all duration-300 ease-in-out  hover:text-highlight">
                    <LuExternalLink size={25} />
                  </div>
                </Link>
              </div>
              <div className="flex flex-row items-center m-4 mb-0 @xs/all:mx-0 gap-4">
                <div className="flex gap-x-4 uppercase text-xs font-bold overflow-x-auto text-nowrap">
                  {project?.languages.map((lang) => (
                    <span key={lang}>{lang}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Wrapper>
      ) : (
        <Wrapper className="text-center w-full">
          <Subtle>No projects found!</Subtle>
        </Wrapper>
      )}
    </>
  );
}
