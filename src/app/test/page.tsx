import Image from "next/image";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl text-green-600 pb-4">Home</h1>
        <Image
          className="border border-green-500 rounded-full"
          src={session?.user.image as string}
          alt={session?.user.username as string}
          width={200}
          height={200}
        />
        <h1>{session?.user.username}</h1>
        <p>{session?.user.name}</p>
        <p>{session?.user.location}</p>
      </div>
    </main>
  );
}
