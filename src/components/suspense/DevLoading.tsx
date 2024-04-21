import React from "react";
import { Wrapper } from "@/components/ui";

export default function DevLoading() {
  return (
    <Wrapper className="p-4 rounded-md border border-border mt-0 md:sticky md:h-min md:top-28 animate-pulse">
      <div className="flex w-full justify-between">
        <div className="w-1/4 h-6 bg-muted rounded mb-2"></div>
        <div className="w-6 h-6 bg-muted rounded mb-2"></div>
      </div>
      <div className="space-y-2">
        <div className="w-36 h-36 bg-muted rounded-full"></div>
        <div className="w-full h-4 bg-muted rounded"></div>
      </div>
      <p className="h-8 bg-muted rounded w-full"></p>
      <div className="grid place-items-center gap-2">
        <h4 className="w-20 h-4 bg-muted rounded"></h4>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="bg-muted h-4 w-16 rounded-full"></span>
          <span className="bg-muted h-4 w-16 rounded-full"></span>
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <span className="w-9 h-9 bg-muted rounded-lg"></span>
        <span className="w-9 h-9 bg-muted rounded-lg"></span>
        <span className="w-9 h-9 bg-muted rounded-lg"></span>
      </div>
    </Wrapper>
  );
}
