import { Badge, Section, Title, Wrapper } from "@/components/ui";
import { getUsers } from "@/data/getData";
import Image from "next/image";
import Link from "next/link";
import { shuffle } from "@/utils/shuffle";
import { Suspense } from "react";
import { DevsLoading } from "@/components/suspense";
import SearchFilter from "@/components/SearchFilter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developers",
};

type Params = {
  search?: string;
  filter?: string;
  filters?: string[];
};

const availableSkills = [
  "Java",
  "JavaScript",
  "React",
  "Node.js",
  "HTML",
  "CSS",
  "TailwindCSS",
];

export default function Page({ searchParams }: { searchParams?: Params }) {
  const filter = searchParams?.filter?.split(",") || [];

  return (
    <Section>
      <Title>
        Search for <span className="text-highlight">skilled</span> Developers
      </Title>
      <Wrapper>
        <SearchFilter
          placeholder="Search by name, username or skills"
          filter={filter}
          available={availableSkills}
        />
        <Suspense fallback={<DevsLoading />}>
          <Devs search={searchParams?.search ?? ""} filters={filter} />
        </Suspense>
      </Wrapper>
    </Section>
  );
}

async function Devs({ search, filters = [] }: Params) {
  const usersData = await getUsers();
  const users = usersData.users;

  await shuffle(users);

  const searchUsers = users.filter((dev) => {
    const username = dev.username.toLowerCase();
    const name = String(dev?.name).toLowerCase();
    const searchLower = search?.toLowerCase() ?? "";
    return (
      username.includes(searchLower) ||
      name.includes(searchLower) ||
      dev.skills.some((skill) => skill.toLowerCase().includes(searchLower))
    );
  });

  const filteredUsers =
    filters.length === 0
      ? searchUsers
      : searchUsers.filter((dev) =>
          dev.skills.some((skill) => filters.includes(skill.toLowerCase()))
        );

  return (
    <Wrapper className="place-items-start mt-0 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredUsers.map((dev) => (
        <div
          key={dev.username}
          className="rounded-lg w-full p-4 pb-2.5 hover:border-highlight border border-border relative"
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
          <p className="pr-2 text-[.9rem] mt-2 h-10 xsm:mx-0 mr-4 line-clamp-2 text-sm">
            {dev.bio ? dev.bio : "Bio will be shown here..."}
          </p>
          <hr className="border-border my-2.5" />
          <div className="flex h-6 gap-2 overflow-x-auto text-sm">
            {dev.skills.length > 0 ? (
              dev.skills.map((skill) => (
                <Badge variant="secondary" key={skill} className="h-min">
                  {skill}
                </Badge>
              ))
            ) : (
              <span>Skills will be added here...</span>
            )}
          </div>
        </div>
      ))}
    </Wrapper>
  );
}
