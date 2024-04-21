"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdExitToApp } from "react-icons/md";
import { Button } from "../ui";

export function ProfileSignout({ user }: { user: Session["user"] }) {
  const path = usePathname();

  return (
    <>
      {`/${user?.username}` === path ? (
        <Button
          variant={"outline"}
          className="max-md:flex-col max-md:text-xs md:gap-2 pb-0.5 pt-1 px-3 md:font-semibold border-dashed bg-transparent"
          onClick={() => signOut()}
        >
          <MdExitToApp className="text-xl md:hidden" />
          Sign out
        </Button>
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
      )}
    </>
  );
}
