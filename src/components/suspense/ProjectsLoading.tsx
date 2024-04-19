import React from 'react'
import { Wrapper } from '@/components/ui';

export default function ProjectsLoading() {
  return (
    <Wrapper className="sm:grid-cols-2 lg:grid-cols-3 grid md:gap-8">
      {[...Array(3)].map((_, k) => (
        <div
          key={k}
          className="p-4 border border-gray-700 rounded-lg w-full h-full relative animate-pulse"
        >
          <div className="h-4 bg-gray-700 rounded mb-2 w-2/3"></div>
          <div className="h-10 bg-gray-700 rounded mb-2 w-full"></div>
          <div className="flex gap-x-2 py-2">
            <span className="bg-zinc-900/80 border border-gray-700/50 px-2 py-1.5 rounded-full w-20"></span>
            <span className="bg-zinc-900/80 border border-gray-700/50 px-2 py-1.5 rounded-full w-20"></span>
            <span className="bg-zinc-900/80 border border-gray-700/50 px-2 py-1.5 rounded-full w-20"></span>
          </div>
          <div className="absolute top-2 right-2 flex">
            <span className="-ml-5 rounded-full border border-gray-800 w-7 h-7 bg-black"></span>
            <span className="-ml-5 rounded-full border border-gray-800 w-7 h-7 bg-black"></span>
            <span className="-ml-5 rounded-full border border-gray-800 w-7 h-7 bg-black"></span>
            <div className="items-center w-5 h-5 bg-gray-800 rounded-md ml-3 mt-0.5">
          </div>
          </div>
          <hr className="pt-4 border-gray-800" />
          <div className="flex gap-x-4 overflow-x-auto">
            <span className="bg-gray-700 rounded-full h-4 w-20"></span>
            <span className="bg-gray-700 rounded-full h-4 w-20"></span>
            <span className="bg-gray-700 rounded-full h-4 w-20"></span>
          </div>
        </div>
      ))}
    </Wrapper>
  );
}
