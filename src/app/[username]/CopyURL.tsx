'use client'

import { Button } from "@/components/ui";
import { cn } from "@/utils/twCSS";
import { useState } from "react";
import { MdCopyAll } from "react-icons/md";

export default function CopyURL() {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true)
        setTimeout(() => {setCopied(false)}, 1800);
    };
  return (
    <Button
      onClick={handleCopy}
      size={"sm"}
      variant={"ghost"}
      className="relative"
    >
      <MdCopyAll className="text-xl" />
      <span
        className={cn(
          "absolute bg-background border border-border py-1.5 px-3 rounded-md -bottom-8 text-primary transition-all",
          copied ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        Copied!
      </span>
    </Button>
  );
}
