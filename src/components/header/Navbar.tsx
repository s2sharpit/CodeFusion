"use client";
import Link from "next/link";
import { navData } from "@/data/navData";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface DivProps extends HTMLAttributes<HTMLDivElement> {}

const Navbar = forwardRef<HTMLDivElement, DivProps>(
  ({ className, children }) => {
    const activePath = usePathname();
    return (
      <div className={cn("flex items-center gap-5", className)}>
        {navData.map((navLink) => (
          <Link
            key={navLink.path}
            href={navLink.path}
            className={cn(
              "flex flex-col items-center md:py-2 md:px-3 text-center hover:text-primary rounded-lg max-md:text-sm",
              activePath === navLink.path ? "text-primary" : ""
            )}
          >
            <span className="text-xl md:hidden">{navLink.icon}</span>
            {navLink.name}
          </Link>
        ))}
        {children}
      </div>
    );
  }
);

Navbar.displayName = "Navbar";
export default Navbar;
