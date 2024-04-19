import React from "react";
import { Wrapper } from "@/components/ui";

export default function DevLoading() {
  return (
    <Wrapper className="p-4 rounded-md border border-gray-800 mt-0 md:sticky md:h-min md:top-28 animate-pulse">
      <div className="flex w-full justify-between">
        <div className="w-1/4 h-6 bg-gray-700 rounded mb-2"></div>
        <div className="w-6 h-6 bg-gray-700 rounded mb-2"></div>
      </div>
      <div className="space-y-2">
        <div className="w-36 h-36 bg-gray-700 rounded-full"></div>
        <div className="w-full h-4 bg-gray-700 rounded"></div>
      </div>
      <p className="h-8 bg-gray-700 rounded w-full"></p>
      <div className="grid place-items-center gap-2">
        <h4 className="w-20 h-4 bg-gray-700 rounded"></h4>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="bg-zinc-900/80 border border-gray-700/50 px-2 py-1.5 rounded-full w-16"></span>
          <span className="bg-zinc-900/80 border border-gray-700/50 px-2 py-1.5 rounded-full w-16"></span>
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <span className="w-9 h-9 bg-gray-700 rounded-lg"></span>
        <span className="w-9 h-9 bg-gray-700 rounded-lg"></span>
        <span className="w-9 h-9 bg-gray-700 rounded-lg"></span>
      </div>
    </Wrapper>
  );
}
