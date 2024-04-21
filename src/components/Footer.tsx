import { cn } from "@/utils/twCSS";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { buttonVariants } from "@/components/ui/Button";
import { Subtle } from "./ui";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <section className="max-w-7xl mx-auto w-11/12 flex max-md:flex-col gap-8 max-md:pb-20">
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
          <div className="grid gap-2">
            <h3 className="font-semibold text-center text-white ">
              Built with ❤ by:
            </h3>
            <div className="flex items-center justify-center gap-6">
              {["s2sharpit", "NidhiK26", "Sarika1510"].map((user) => (
                <Link
                  key={user}
                  href={`https://github.com/${user}`}
                  target="_blank"
                  className="group"
                >
                  <figure className="grid place-items-center gap-0.5">
                    <Image
                      src={`https://github.com/${user}.png`}
                      width={40}
                      height={40}
                      alt={user}
                      className="rounded-full border border-border"
                    />
                    <figcaption className="text-xs group-hover:text-primary duration-150">
                      @{user}
                    </figcaption>
                  </figure>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </footer>
  );
}
