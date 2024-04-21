"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "./ui/Button";
import { cn } from "@/utils/twCSS";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600/20 grid place-items-center z-50 text-white">
      <dialog
        ref={dialogRef}
        className="w-4/5 max-w-4xl h-auto max-h-[36rem] border-none rounded-xl bg-black p-5 relative grid place-items-center text-white"
        onClose={onDismiss}
      >
        {children}
        <button
          onClick={onDismiss}
          className={cn(
            buttonVariants({variant: 'ghost', size: 'icon'}),
            "absolute top-2.5 right-2.5 bg-transparent after:content-['x'] after:text-white text-2xl"
          )}
        />
      </dialog>
    </div>
  );
}
