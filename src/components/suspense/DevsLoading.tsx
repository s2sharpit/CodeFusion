import React from "react";
import { Wrapper } from "@/components/ui";

export default function DevsLoading() {
  return (
    <Wrapper variant="flex">
      {[...Array(3)].map((_, k) => (
        <div
          key={k}
          className="p-2 border border-gray-800 rounded-md w-40 animate-pulse grid place-items-center"
        >
          <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
          <div className="w-24 h-24 bg-gray-700 rounded-full mb-2"></div>
          <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
          {/* <div className="w-full h-12 bg-gray-700 rounded"></div> */}
        </div>
      ))}
    </Wrapper>
  );
}
