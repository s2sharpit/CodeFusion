import { Section, Wrapper } from "@/components/ui";
import Subtle from "@/components/ui/Subtle";
import { getProjects, getUsers } from "@/lib/getData";
import { getGhUser } from "@/lib/getGhData";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdCopyAll } from "react-icons/md";

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const [user, projects, ghUser] = await Promise.all([
    getUsers().then((users) =>
      users.find((dev) => dev.username === params.username)
    ),
    getProjects(),
    getGhUser(params?.username),
  ]);

  if (!user) {
    notFound();
  }

  return (
    <Section className="grid grid-cols-[0.7fr_1.3fr]">
      <Wrapper className="p-4 rounded-md border border-gray-800 mt-0">
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

        <p className="text-center text-sm">{ghUser?.bio}</p>
        <div className="grid place-items-center gap-2">
          <h4 className="">Skills</h4>
          <div className="flex flex-wrap justify-center text-xs gap-2">
            {user.skills.map((skill) => (
              <p
                key={skill}
                className="bg-zinc-900/80 border border-gray-700/50 px-2 py-0.5 rounded-full"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>

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
    </Section>
  );
}
