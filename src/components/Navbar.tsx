"use client";
import Link from "next/link";
import { navData } from "@/data/navData";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const activePath = usePathname();
  return (
    <ul className="flex items-center gap-5">
      {navData.map((navLink) => (
        <li key={navLink.path}>
          <Link
            href={navLink.path}
            className={cn("inline-block py-2 px-3 text-center hover:text-primary rounded-lg",
              activePath === navLink.path ? "text-primary" : ""
            )}
          >
            {navLink.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
