import { auth } from "@/lib/auth";
import Image from "next/image";

export default async function page() {
  try {
    const session = await auth();
    const request = await fetch(
      "https://api.github.com/repos/s2sharpit/krishi-bazaar/collaborators",
      {
        headers: {
          Authorization: `token ${session?.user.accessToken}`,
        },
      }
    );

    if (!request.ok) {
      throw new Error("Failed to fetch data from GitHub API");
    }

    const data = await request.json();
    const headers = request.headers;
    const remaining = headers.get("x-ratelimit-remaining");
    const limit = headers.get("x-ratelimit-limit");

    return (
      <main className="flex gap-20 flex-col items-center justify-between p-24">
        <p>
          Rate limit: ({remaining}, {limit})
        </p>
        <div className="flex flex-wrap gap-20">
          {data.map((user: any) => (
            <div key={user?.id}>
              <Image
                src={user.avatar_url}
                alt={user.login}
                width={100}
                height={100}
                className="rounded-full"
              />
              <p>{user.login}</p>
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    console.error("An error occurred:", error);
    return <div>An error occurred while fetching data.</div>;
  }
}
