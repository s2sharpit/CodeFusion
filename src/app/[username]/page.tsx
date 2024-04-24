import ProjectsList from "@/components/ProjectsList";
import { DevLoading, ProjectsLoading } from "@/components/suspense";
import { Badge, Section, Wrapper } from "@/components/ui";
import Subtle from "@/components/ui/Subtle";
import { getProjects, getUsers } from "@/data/getData";
import { auth } from "@/lib/auth";
import { getGhUser } from "@/data/getGhData";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MdCopyAll } from "react-icons/md";
import AddProject from "@/components/AddProject";
import { toast } from "sonner";

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const session = await auth();
  return (
    <Section className="grid md:grid-cols-[0.8fr_1.3fr] gap-6 @container/dev">
      <Suspense fallback={<DevLoading />}>
        <DevCard paramsUser={params?.username} />
      </Suspense>
      <Suspense fallback={<ProjectsLoading />}>
        <div className="flex flex-col gap-3">
          {session?.user?.username === params?.username && <AddProject session={session} />}
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

async function DevCard({ paramsUser }: { paramsUser: string }) {
  const usersData = await getUsers();
  const ghUser = await getGhUser(paramsUser);

  // ! error using in server components, do not uncomment
  // if (!usersData.users || usersData.error) {
  //   toast.error(usersData.error)
  // }

  const user = usersData?.users.find((dev) => dev.username === paramsUser);

  if (!user) {
    notFound();
  }

  return (
    <Wrapper className="p-4 rounded-md border border-border mt-0 md:sticky md:h-min md:top-28">
      <div className="flex w-full justify-between">
        <h4 className="font-semibold">@{user?.username}</h4>
        <Link href="/" className="text-2xl">
          <MdCopyAll />
        </Link>
      </div>
      <picture className="space-y-2">
        <Image
          src={user.image as string}
          alt={user.username}
          width={200}
          height={200}
          className="rounded-full w-36 h-36"
        />
        <Subtle size={"sm"}>{user?.name}</Subtle>
      </picture>

      <p className="text-center text-pretty text-sm">{user?.bio}</p>
      {user?.skills.length > 0 && (
        <div className="grid place-items-center gap-2">
          <h4 className="text-primary font-medium text-sm">Skills</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {user?.skills.map((skill) => (
              <Badge variant={"secondary"} key={skill}>
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-row flex-wrap justify-center items-center xsm:mx-auto ">
        {ghUser?.social_accounts.map(
          ({ provider, url, icon }: SocialAccount) => (
            <div className="mx-4" key={provider}>
              <Link
                href={url ?? ""}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer inline-flex h-10 items-center rounded-lg  font-extrabold text-[1.5rem] hover:scale-110 transition-all duration-300 ease-in-out hover:text-purple-500"
                aria-label={`Follow us on ${provider}`}
                title={`${provider}(External Link)`}
              >
                {icon}
              </Link>
            </div>
          )
        )}
      </div>
    </Wrapper>
  );
}
