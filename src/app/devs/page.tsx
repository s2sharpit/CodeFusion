import { Badge, Section, Subtle, Title, Wrapper } from "@/components/ui";
import { getUsers } from "@/data/getData";
import Image from "next/image";
import Link from "next/link";
import { shuffle } from "@/utils/shuffle";
import { Suspense } from "react";
import { DevsLoading } from "@/components/suspense";

export default function page() {
  return (
    <Section>
      <Title>
        Search for <span className="text-highlight">skilled</span> Developers
      </Title>
      <Suspense fallback={<DevsLoading />}>
        <Devs />
      </Suspense>
    </Section>
  );
}

async function Devs() {
  const usersData = await getUsers();
  // ! error using in server components, do not uncomment
  // if (!usersData.users || usersData.error) {
  //   toast.error(usersData.error)
  // }

  const users = usersData.users;
  await shuffle(users);
  return (
    <Wrapper className="place-items-start md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((dev) => (
        <div
          key={dev.username}
          className="rounded-lg w-full p-4 hover:border-highlight border border-border relative"
        >
          <Link href={`/${dev.username}`} className="group">
            <h3 className="text-primary capitalize text-lg/5 font-bold basis-full line-clamp-1">
              {dev.name}
            </h3>
            <h4 className="text-sm group-hover:text-primary">
              @{dev.username}
            </h4>

            <Image
              className="border border-border rounded-full h-fit absolute right-3 top-2.5"
              src={dev?.image as string}
              alt={dev?.username}
              width={52}
              height={52}
            />
          </Link>
          <p className="pr-2 text-[.9rem] my-2 h-11 xsm:mx-0 mr-4 line-clamp-2 @xs/all:text-sm">
            {dev.bio}
          </p>
          <div className="flex h-6 gap-2 overflow-x-auto">
            {dev?.skills.map((skill) => (
              <Badge variant="secondary" key={skill} className="h-min">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </Wrapper>
  );
}
