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
        <Link href="/" className="font-bold text-xl items-center flex">
          Code<span className="text-primary">Fusion</span>
        </Link>
        <Navbar className="max-md:hidden">
          {user ? <ProfileSignout user={user} /> : <SignIn />}
        </Navbar>
      </header>
      <div className="fixed md:hidden bottom-4 left-0 right-0 bg-transparent w-full mx-auto  text-white px-8">
        <Navbar className=" w-full justify-evenly bg-transparent backdrop-blur-md border-gray-700 border p-4 rounded-xl">
          {user ? <ProfileSignout user={user} /> : <SignIn />}
        </Navbar>
      </div>
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
        className="flex items-center gap-2 py-2 px-3 rounded-md font-semibold bg-white hover:bg-gray-200 transition text-black"
        type="submit"
      >
        <FaGithub className="text-xl" /> Sign in
      </button>
    </form>
  );
}
