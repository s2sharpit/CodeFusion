import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  const res = await fetch("https://api.github.com/user", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });
  const data = await res.json();

  return Response.json(data);
}
