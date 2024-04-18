import { Wrapper } from "@/components/ui";
import { getProjects } from "@/lib/getData";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

export default async function ProjectsList({ username }: { username: string }) {
  const projects = await getProjects();
  const userProjects = projects.filter((project) =>
    project.collaborators.some(
      (collaborator) => collaborator.username === username
    )
  );

  return (
    <Wrapper className="place-items-start mt-0">
      {userProjects.map((project) => (
        <div
          key={project.id}
          className="rounded-lg w-full p-4 text-white hover:border-primary border border-gray-800"
        >
          <div className=" border-b border-gray-600 p-4 relative">
            <h3 className="capitalize text-lg/5 font-bold basis-full line-clamp-1">
              {project.title}
            </h3>
            <p className="pr-2 text-[.9rem] my-2 xsm:mx-0 mr-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex gap-x-2 capitalize text-xs overflow-x-auto pt-2">
              {project?.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-zinc-900/80 border border-gray-700/50 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={project.repo}
              // target="_blank"
              rel="noreferrer"
              className="absolute top-[-.5rem] right-[-.2rem]"
            >
              <div className="inline-flex h-10 items-center rounded-lg font-extrabold text-[2rem] hover:scale-110 transition-all duration-300 ease-in-out  hover:text-primary">
                <LuExternalLink size={25} />
              </div>
            </Link>
          </div>
          <div className="flex flex-row items-center m-4 mb-0 gap-4">
            <div className="flex flex-wrap gap-2">
              {project.techStacks.map((tag, i) => (
                <span
                  className={`text-xs font-semibold inline-block py-1 px-2 .uppercase rounded-full uppercase mr-2 `}
                  key={i}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </Wrapper>
  );
}
