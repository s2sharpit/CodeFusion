import React from "react";
import { Wrapper } from "@/components/ui";

export default function ProjectsLoading() {
  return (
    <Wrapper className="place-items-start md:gap-6 @xs/dev:mt-0 @xs/all:sm:grid-cols-2 @xs/all:lg:grid-cols-3">
      {[...Array(3)].map((_, k) => (
        <div
          key={k}
          className="rounded-lg w-full p-4 border border-border animate-pulse"
        >
          <div className=" border-b border-border @xs/dev:p-4 @xs/all:pb-2 relative">
            <div className="h-4 bg-muted rounded mb-3 w-2/3"></div>
            <div className="h-10 bg-muted rounded mb-2 w-full"></div>
            <div className="flex gap-x-2 @xs/dev:pt-2">
              <span className="bg-muted rounded-full h-4 w-20"></span>
              <span className="bg-muted rounded-full h-4 w-20"></span>
              <span className="bg-muted rounded-full h-4 w-20"></span>
            </div>
            <div className="flex items-center gap-3 absolute -top-2.5 -right-1">
              <div className="flex">
                <div className="-ml-5 rounded-full border bg-muted border-primary-foreground w-8 h-8"></div>
                <div className="-ml-5 rounded-full border bg-muted border-primary-foreground w-8 h-8"></div>
                <div className="-ml-5 rounded-full border bg-muted border-primary-foreground w-8 h-8"></div>
              </div>
              <div className="inline-flex items-center w-6 h-6 bg-muted rounded-md"></div>
            </div>
          </div>
          <div className="flex flex-row items-center m-4 mb-0 @xs/all:mx-0 gap-4">
            <div className="flex gap-x-4">
              <span className="bg-muted rounded-full h-4 w-20"></span>
              <span className="bg-muted rounded-full h-4 w-20"></span>
              <span className="bg-muted rounded-full h-4 w-20"></span>
            </div>
          </div>
        </div>
      ))}
    </Wrapper>
  );
}
