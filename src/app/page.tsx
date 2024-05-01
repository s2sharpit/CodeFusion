import Link from "next/link";
import { FaGithub, FaGlobe, FaMoneyBill } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";

export default function Home() {
  return (
    <div>
      <div className='flex'>
        <div className='w-1/2 ml-7'>
          <p className='text-7xl font-bold mt-20 text-white'>Explore. Create. Collab.</p> 
          <p className="text-xl mt-10">CodeFusion is a platform where you can share your open source projects, explore and collab within the college.</p>
          <Link href="/projects" className="outline outline-1 hover:outline-highlight rounded-sm mt-12 text-lg text-white px-4 py-2 bg-transparent hover:bg-white hover:text-gray-800 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-50 text-right">
           Explore Projects
          </Link>
        </div>
        <div className='w-1/2'>
          {/* right half  */}


        </div>
      </div>

      <div className="flex justify-center flex-col items-center mt-10">
        <p className="mt-10 text-3xl text-white font-bold ">Why should you use this? </p>
        <p className="text-highlight font-bold">Showcase your projects</p>
      </div>

      <div className="flex justify-evenly mt-10">
        <div className="hover:outline outline-1 outline-highlight rounded-lg px-4 py-4 flex items-center mt-7 w-1/3">
          <FaGithub className="text-3xl mr-2 text-highlight" />
          <div>
            <span className="text-primary font-bold" style={{ display: "block" }}>Add GitHub link</span>
            <span style={{ display: "block" }}>You can add your GitHub repository link to your profile.</span>
          </div>
        </div>
        <div className="hover:outline outline-1 outline-highlight rounded-lg px-4 py-4  flex items-center mt-7 w-1/3">
          <FaShareNodes className="text-3xl mr-2 text-highlight" />
          <div>
            <span className="text-primary font-bold" style={{ display: "block" }}>Share Nodes</span>
            <span style={{ display: "block" }}>Share your profile with your friends and colleagues.</span>
          </div>
        </div>
      </div>

      <div className="flex justify-evenly mt-10">
        <div className="hover:outline outline-1 outline-highlight rounded-lg px-4 py-4  flex items-center mt-7 mb-10 w-1/3">
          <FaGlobe className="text-3xl mr-2 text-highlight" />
          <div>
            <span className="text-primary font-bold" style={{ display: "block" }}>Web Favicon</span>
            <span style={{ display: "block" }}>This platform is open source and you can contribute to it.</span>
          </div>
        </div>
        <div className="hover:outline outline-1 outline-highlight rounded-lg px-4 py-4  flex items-center mt-7 mb-10 w-1/3">
          <FaMoneyBill className="text-3xl mr-2 text-highlight" /> 
          <div>
            <span className="text-primary font-bold" style={{ display: "block" }}>Money Bill</span>
            <span style={{ display: "block" }}>This platform is free to use and you don't have to pay anything.</span>
          </div>
        </div>
      </div>

    </div>
  );
}
