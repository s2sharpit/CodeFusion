import Link from "next/link";
import Navbar from "./Navbar";
import { auth, signIn, signOut } from "@/lib/auth";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";

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

function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <p>{children}</p>
      <button type="submit">Sign out</button>
    </form>
  );
}

export default async function Header() {
  const session = await auth();
  const user = session?.user;
  return (
    <header className="flex justify-between md:justify-around p-5 w-full text-white top-0 z-10 sticky border-b border-gray-800 mx-auto bg-transparent backdrop-blur-sm">
      <Link href="/" className="font-bold text-xl items-center flex">
        Code<span className="text-primary">Fusion</span>
      </Link>
      <div className="flex items-center gap-5">
        <Navbar />
        <span>
          {user ? (
            <Link href={`/${user?.username}`}>
              <Image
                className="rounded-full max-h-min h-10 w-10 border border-gray-600"
                src={user?.image as string}
                alt={user?.username}
                width={80}
                height={80}
              />
            </Link>
          ) : (
            <SignIn />
          )}
        </span>
      </div>
    </header>
  );
}

{
  /* <SignOut>{`Welcome ${user.username}`}</SignOut> */
}
