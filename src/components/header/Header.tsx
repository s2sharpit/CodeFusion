import Link from "next/link";
import Navbar from "./Navbar";
import { auth, signIn } from "@/lib/auth";
import { FaGithub } from "react-icons/fa6";
import { ProfileSignout } from "../Client";

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <header className="flex justify-between md:justify-around p-5 w-full text-white top-0 z-10 sticky border-b border-gray-800 mx-auto bg-transparent backdrop-blur-sm">
        <Link href="/" className="font-bold text-2xl items-center flex">
          Code<span className="text-primary">Fusion</span>
        </Link>
        <Navbar className="max-md:hidden">
          {user ? <ProfileSignout user={user} /> : <SignIn />}
        </Navbar>
      </header>
      <Navbar className="fixed md:hidden bottom-4 left-0 right-0 mx-auto text-white w-11/12 min-w-fit justify-evenly bg-black/50 backdrop-blur-md border-gray-700 border p-4 xs:px-8 rounded-xl">
        {user ? <ProfileSignout user={user} /> : <SignIn />}
      </Navbar>
    </>
  );
}

function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button
        className="flex max-md:flex-col items-center max-md:text-xs md:gap-2 pb-0.5 pt-1 md:py-2 px-3 rounded-md font-medium md:font-semibold bg-white hover:bg-gray-200 transition text-black"
        type="submit"
      >
        <FaGithub className="text-xl" /> Sign in
      </button>
    </form>
  );
}
