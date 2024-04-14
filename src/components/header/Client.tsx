"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdExitToApp } from "react-icons/md";

export function ProfileSignout({ user }: { user: Session["user"] }) {
  const path = usePathname();

  return (
    <>
      {`/${user?.username}` === path ? (
        <button
          className="flex flex-col items-center pt-1 pb-0.5 md:py-2 px-3 rounded-md transition outline-dashed outline-1 outline-gray-700 hover:outline-gray-600 max-md:text-xs"
          onClick={() => signOut()}
        >
          <MdExitToApp className="text-xl md:hidden" />
          Sign out
        </button>
      ) : (
        <Link
          href={`/${user?.username}`}
          className="flex flex-col items-center rounded-md"
        >
          <Image
            className="rounded-full max-h-min h-11 md:h-10 w-11 md:w-10 border border-gray-800"
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
