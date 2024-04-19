import { Section, Title, Wrapper } from "@/components/ui";
import { getUsers } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";
import { shuffle } from "@/utils/shuffle";
import { User } from "@prisma/client";
import { Suspense } from "react";
import { DevsLoading } from "@/components/suspense";

export default function page() {
  return (
    <Section>
      <Title>
        Search for <span className="text-primary">skilled</span> Developers
      </Title>
      <Suspense fallback={<DevsLoading />}>
        <Devs />
      </Suspense>
    </Section>
  );
}

async function Devs() {
  const users: User[] = await getUsers();
  await shuffle(users);
  return (
    <Wrapper variant="flex">
      {users.map((dev) => (
        <div
          key={dev.username}
          className="p-2 border border-gray-700 hover:border-primary rounded-md w-40"
        >
          <Link
            href={`/${dev?.username}`}
            className="text-sm font-semibold hover:text-primary"
          >
            @{dev?.username}
          </Link>
          <figure className="grid place-items-center p-2">
            <Image
              className="border border-gray-800 rounded-full"
              src={dev?.image as string}
              alt={dev?.username}
              width={120}
              height={120}
            />
            <figcaption>{dev?.name}</figcaption>
          </figure>
          {/* <div className="flex  justifycenter text-xs gap-2 overflow-x-auto text-nowrap">
            {dev?.skills.map((skill) => (
              <p
                key={skill}
                className="bg-zinc-900/80 border border-gray-700/50 px-2 py-0.5 rounded-full"
              >
                {skill}
              </p>
            ))}
          </div> */}
        </div>
      ))}
    </Wrapper>
  );
}
