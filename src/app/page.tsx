import Image from "next/image";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(session, null, 2)}
    </main>
  );
}
