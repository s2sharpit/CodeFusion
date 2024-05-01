import { Badge, Button, Section, Subtle, Title } from "@/components/ui";
import { getProjects } from "@/data/getData";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGithub } from "react-icons/fa6";
import LikeBtn from "./LikeBtn";
import UpdateProject from "@/components/UpdateProject";

type Props = {
  params: { projectname: string, username: string };
};

export async function generateMetadata({ params }: Props) {
  const title = params.projectname[0].toUpperCase() + params.projectname.slice(1);
  // const user = params.username[0].toUpperCase() + params.username.slice(1);
  return {
    title: `${title}`,
  };
}

export default async function Page({
  params,
}: {
  params: { username: string; projectname: string };
}) {
  const session = await auth();
  const projectsData = await getProjects();

  const project = projectsData?.projects.find(
    (project) => project.repo === `${params.username}/${params.projectname}`
  );

  if (!project) {
    notFound();
  }

  const isEditable = session?.user.username === project.username;

  return (
    <Section>
      <div className="flex max-md:flex-col justify-between md:items-center mb-6">
        <Title size={'sm'} className="max-md:mb-2 md:mr-6">
          {project.title}
        </Title>
        <div className="flex gap-4">
          {isEditable && <UpdateProject project={project} />}
          <LikeBtn username={session?.user.username as string} project={project} />
          <Button
            asChild
            variant="link"
            size="icon"
            className="text-4xl"
          >
            <Link href={`https://github.com/${project.repo}`} target="_blank">
              <FaGithub />
            </Link>
          </Button>
        </div>
      </div>

      <p className="mb-6 md:text-lg">{project?.description}</p>

      <div className="mb-6">
        <Subtle size="sm">Topics:</Subtle>
        <div className="flex flex-wrap gap-2 mt-2">
          {project?.topics.map((topic) => (
            <Badge variant="secondary" key={topic}>
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <Subtle size="sm">Languages:</Subtle>
        <div className="flex flex-wrap gap-4 mt-2 text-sm font-bold">
          {project?.languages.map((lang) => (
            <span key={lang}>{lang}</span>
          ))}
        </div>
      </div>

      <div>
        <Subtle size="sm">Collaborators:</Subtle>
        <div className="flex flex-wrap gap-4 mt-2">
          {project?.collaborators.map((collab) => (
            <Link
              href={`/${collab}`}
              key={collab}
              className="flex flex-col items-center"
            >
              <Image
                src={`https://github.com/${collab}.png`}
                alt={collab}
                width={52}
                height={52}
                className="rounded-full border border-gray-800"
              />
              <figcaption className="text-xs mt-1">@{collab}</figcaption>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
