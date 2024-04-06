"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProfileSignout({ user }: { user: Session["user"] }) {
  const path = usePathname();

  return (
    <div>
      {`/${user?.username}` === path ? (
        <button
          className="py-2 px-3 rounded-md transition border border-gray-700 hover:border-gray-500"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      ) : (
        <Link href={`/${user?.username}`}>
          <Image
            className="rounded-full max-h-min h-10 w-10 border border-gray-600"
            src={user?.image as string}
            alt={user?.username as string}
            width={80}
            height={80}
          />
        </Link>
      )}
    </div>
  );
}
