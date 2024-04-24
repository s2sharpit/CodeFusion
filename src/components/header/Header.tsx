import Link from "next/link";
import Navbar from "./Navbar";
import { auth } from "@/lib/auth";
import { FaGithub } from "react-icons/fa6";
import { Profile } from "./Profile";
import { Button } from "@/components/ui";

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <header className="flex justify-between md:justify-around p-5 w-full text-muted-foreground top-0 z-10 sticky border-b border-border mx-auto bg-transparent backdrop-blur-sm">
        <Link href="/" className="font-bold text-2xl items-center flex text-primary">
          Code<span className="text-highlight">Fusion</span>
        </Link>
        <Navbar className="max-md:hidden">
          <Profile user={user} />
        </Navbar>
      </header>
      <Navbar className="fixed md:hidden bottom-4 left-0 right-0 mx-auto text-muted-foreground w-11/12 min-w-fit justify-evenly bg-background/50 backdrop-blur-md border-border border p-4 xs:px-8 rounded-xl">
        <Profile user={user} />
      </Navbar>
    </>
  );
}