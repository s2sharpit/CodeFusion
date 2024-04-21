import React from "react";
import { Wrapper } from "@/components/ui";

export default function DevsLoading() {
  return (
    <Wrapper variant="flex">
      {[...Array(4)].map((_, k) => (
        <div
          key={k}
          className="p-4 border border-border rounded-md w-40 animate-pulse grid place-items-center gap-4"
        >
          <div className="w-full h-4 bg-muted rounded"></div>
          <div className="w-24 h-24 bg-muted rounded-full"></div>
          <div className="w-full h-4 bg-muted rounded"></div>
          {/* <div className="w-full h-12 bg-muted rounded"></div> */}
        </div>
      ))}
    </Wrapper>
  );
}
