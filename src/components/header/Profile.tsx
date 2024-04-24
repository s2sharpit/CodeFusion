"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdExitToApp } from "react-icons/md";
import { Button } from "@/components/ui";
import { FaGithub } from "react-icons/fa6";
import { signInAction } from "@/data/actions";
import { toast } from "sonner";

export function Profile({ user }: { user: Session["user"] | undefined }) {
  const path = usePathname();

  return (
    <>
      {user ? (
        `/${user?.username}` === path ? (
          <SignOut />
        ) : (
          <Link
            href={`/${user?.username}`}
            className="flex flex-col items-center rounded-md"
          >
            <Image
              className="rounded-full max-h-min h-11 md:h-10 w-11 md:w-10 border border-border"
              src={user?.image as string}
              alt={user?.username as string}
              width={80}
              height={80}
            />
            {/* <span className="md:hidden text-sm">Profile</span> */}
          </Link>
        )
      ) : (
        <SignIn />
      )}
    </>
  );
}

function SignOut() {
  const handleClick = async () => {
    toast.promise(signOut(), {
      loading: "Signing out...",
      success: "Successfully signed out!",
      error: "Failed to sign out!",
    });
  };
  return (
    <Button
      variant={"outline"}
      className="max-md:flex-col max-md:text-xs md:gap-2 pb-0.5 pt-1 px-3 md:font-semibold border-dashed bg-transparent"
      onClick={handleClick}
    >
      <MdExitToApp className="text-xl md:hidden" />
      Sign out
    </Button>
  );
}

function SignIn() {
  const handleSubmit = async () => {
    toast.promise(await signInAction(), {
      loading: "Signing in...",
      success: "Successfully signed in!",
      error: "Failed to sign in!",
    });
  };
  return (
    <form action={handleSubmit}>
      <Button
        className="max-md:flex-col max-md:text-xs md:gap-2 pb-0.5 pt-1 px-3 md:font-semibold"
        type="submit"
      >
        <FaGithub className="text-xl" /> Sign in
      </Button>
    </form>
  );
}
