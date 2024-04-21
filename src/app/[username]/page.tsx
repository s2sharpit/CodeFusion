import ProjectsList from "@/components/ProjectsList";
import { DevLoading, ProjectsLoading } from "@/components/suspense";
import { Section, Wrapper } from "@/components/ui";
import Subtle from "@/components/ui/Subtle";
import { getProjects, getUsers } from "@/lib/getData";
import { auth } from "@/lib/auth";
import { getGhUser } from "@/lib/getGhData";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MdCopyAll } from "react-icons/md";
import { cn } from "@/utils/twCSS";
import { Button, buttonVariants } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
        <Wrapper className="mt-0">
          {session?.user?.username === params?.username && (
            <div className="flex justify-end w-full -mb-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Project</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                    <DialogDescription>Description</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">Working Area</div>
                </DialogContent>
              </Dialog>
            </div>
          )}
          <DevProjects paramsUser={params?.username} />
        </Wrapper>
      </Suspense>
    </Section>
  );
}

async function DevProjects({ paramsUser }: { paramsUser: string }) {
  const projects = await getProjects();
  const devProjects = projects.filter((project) =>
    project.collaborators.some(
      (collaborator) => collaborator.username === paramsUser
    )
  );

  return <ProjectsList projects={devProjects} />;
}

async function DevCard({ paramsUser }: { paramsUser: string }) {
  const users = await getUsers();
  const ghUser = await getGhUser(paramsUser);

  const user = users.find((dev) => dev.username === paramsUser);

  if (!user) {
    notFound();
  }

  return (
    <Wrapper className="p-4 rounded-md border border-gray-800 mt-0 md:sticky md:h-min md:top-28">
      <div className="flex w-full justify-between">
        <p className="font-semibold">@{user?.username}</p>
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

      <p className="text-center text-pretty text-sm">{ghUser?.bio}</p>
      {user?.skills.length > 0 && (
        <div className="grid place-items-center gap-2">
          <h4 className="text-white font-medium text-sm">Skills</h4>
          <div className="flex flex-wrap justify-center text-xs gap-2">
            {user?.skills.map((skill) => (
              <p
                key={skill}
                className="bg-zinc-900/80 border border-gray-700/50 px-2 py-0.5 rounded-full"
              >
                {skill}
              </p>
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
