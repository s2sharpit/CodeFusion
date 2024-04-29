import { cn } from "@/utils/twCSS";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { buttonVariants } from "@/components/ui/Button";
import { Subtle } from "./ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <section className="max-w-7xl mx-auto w-11/12">
        <div className="flex max-md:flex-col gap-8">
          {/* Left Half */}
          <aside className="">
            <Subtle className="md:text-left">
              Code<span className="text-highlight">Fusion</span>
            </Subtle>
            <p className="mt-4 text-center md:text-left text-pretty lg:text-balance">
              Empowering college students with seamless project uploads,
              collaboration tools, and social integration for academic and
              professional excellence.
            </p>
          </aside>

          {/* Right Half */}
          <aside className="grid place-items-center gap-8">
            <Link
              href="https://github.com/s2sharpit/CodeFusion"
              target="_blank"
              className={cn(
                buttonVariants(),
                "flex gap-2 font-extrabold h-14 w-fit text-[17px] "
              )}
            >
              <FaGithub className="text-3xl" />
              <span> Star us ✨</span>
            </Link>
          </aside>
        </div>
        <div className="flex max-md:flex-col justify-center mt-12 gap-x-2 items-center max-md:pb-20">
          <h3 className="font-semibold text-center text-white ">
            Built with ❤ by:
          </h3>
          <div className="space-x-2">
            {["s2sharpit", "NidhiK26", "Sarika1510"].map((user) => (
              <HoverCard key={user}>
                <HoverCardTrigger asChild>
                  <Link
                    href={`https://github.com/${user}`}
                    target="_blank"
                    className="text-sm font-medium cursor-pointer hover:underline underline-offset-4"
                  >
                    @{user},
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src={`https://github.com/${user}.png`} />
                      <AvatarFallback className="capitalize">
                        {user.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">@{user}</h4>
                      <p className="text-sm">
                        Creater and maintainer by @codefusion.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
}
