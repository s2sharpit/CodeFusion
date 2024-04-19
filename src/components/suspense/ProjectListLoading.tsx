import { Wrapper } from "../ui";

export default function ProjectListLoading() {
  return (
    <Wrapper className="place-items-start mt-0 animate-pulse">
      {[...Array(3)].map((_, k) => (
        <div key={k} className="rounded-lg w-full p-4 border border-gray-800">
          <div className="border-b border-gray-600 p-4 relative">
            <div className="h-4 bg-gray-700 rounded mb-2 w-2/3"></div>
            <div className="h-10 bg-gray-700 rounded mb-2 w-full"></div>
            <div className="flex gap-x-2 pt-2">
              <span className="bg-zinc-900/80 border border-gray-700/50 px-2 py-1.5 rounded-full w-20"></span>
              <span className="bg-zinc-900/80 border border-gray-700/50 px-2 py-1.5 rounded-full w-20"></span>
              <span className="bg-zinc-900/80 border border-gray-700/50 px-2 py-1.5 rounded-full w-20"></span>
            </div>
            <div className="absolute top-[-.5rem] right-[-.2rem] w-6 h-6 bg-gray-800 rounded-md"></div>
          </div>
          <div className="flex flex-row items-center m-4 mb-0 gap-4">
            <span className="bg-gray-700 rounded-full h-4 w-20"></span>
            <span className="bg-gray-700 rounded-full h-4 w-20"></span>
            <span className="bg-gray-700 rounded-full h-4 w-20"></span>
          </div>
        </div>
      ))}
    </Wrapper>
  );
}
