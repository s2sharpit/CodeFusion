import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  const request = await fetch(
    "https://api.github.com/repos/s2sharpit/s2sharpit/contributors"
  );
  const data = await request.json();
  const headers = request.headers;
  const remaining = headers.get("x-ratelimit-remaining");
  const limit = headers.get("x-ratelimit-limit");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(session, null, 2)}
      <p>
        {remaining}, {limit}
      </p>
      <p>{JSON.stringify(headers)}</p>
      {/* <p>{JSON.stringify(data)}</p> */}
    </main>
  );
}
