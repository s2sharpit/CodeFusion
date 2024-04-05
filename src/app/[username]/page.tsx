import { getUsers } from "@/lib/getData";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const users = await getUsers();
  const user = users.find(dev => dev.username === params.username);
  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-red-500 pt-6 text-3xl">From API</h1>
      <h1>{user?.username}</h1>
      <p>{user?.name}</p>
      <p>{user?.id}</p>
      <p>{user?.email}</p>
      <p>{user?.major}</p>
      <p>{user?.interests}</p>
      <Image
        className="border border-green-500 rounded-full"
        src={user?.image as string}
        alt={user?.username}
        width={200}
        height={200}
      />
    </div>
  );
}
