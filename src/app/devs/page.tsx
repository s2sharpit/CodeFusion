import { Section, Title, Wrapper } from "@/components/ui";
import { getUsers } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";
import { shuffle } from "@/utils/shuffle";
import { User } from "@prisma/client";

export default async function Devs() {
  const users: User[] = await getUsers();
  await shuffle(users);

  return (
    <Section>
      <Title>
        Search for <span className="text-primary">skilled</span> Developers
      </Title>
      <Wrapper variant="flex">
        {users.map((dev) => (
          <DevCard key={dev?.username} dev={dev} />
        ))}
      </Wrapper>
    </Section>
  );
}

function DevCard({ dev }: { dev: User }) {
  return (
    <Link
      href={`/${dev?.username}`}
      className="p-4 border border-gray-700 hover:border-primary rounded-md"
    >
      <h1>{dev?.username}</h1>
      <p>{dev?.name}</p>
      <Image
        className="border border-gray-800 rounded-full"
        src={dev?.image as string}
        alt={dev?.username}
        width={120}
        height={120}
      />
    </Link>
  );
}
