import React from 'react';
import { FaGithub } from 'react-icons/fa';
export default function Footer() {
  return (
    <footer className="border-t border-gray-800">
      <div className="max-w-7xl mx-auto w-11/12">
        <div className="flex flex-col lg:flex-row justify-between py-8">
          {/* Left Half */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <span className="font-bold text-2xl items-center flex"> Code<span className="text-primary">Fusion</span></span>
            <p className="mt-4 text-center lg:text-left text-gray-200 dark:text-gray-400">
              Empowering college students with seamless project uploads, collaboration tools, and social integration for academic and professional excellence.
            </p>
          </div>

          {/* Right Half */}
          <div className="w-full lg:w-1/2 flex justify-end mr-5">
            <div className="float-left">

              <div className='border-solid border-1 border-white shadow-lg rounded-lg p-2 text-center'>
              <a href="#">
                
                <button className='bg-white  py-2 px-4 rounded-lg hover:bg-gray-700 text-black mb-2 font-medium'><FaGithub className="w-5 h-5 mr-1 inline"/>Star us✨</button>
              </a>
              </div>
              <h3 className='font-bold text-center '>Developed By:</h3>
              <br></br>
              <div className="flex items-center mb-5 justify-center">
                <a href="#" className="flex items-center mr-5">
                  <div className=' rounded-full shadow-lg mr-2'>
                    <img src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png" alt="photo" className="w-9 h-9 rounded-full" />
                    <span>Tushar</span>
                  </div>
                 
                </a>
                <a href="#" className="flex items-center mr-5">
                  <div className=' rounded-full shadow-lg mr-2'>
                    <img src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png" alt="photo" className="w-9 h-9 rounded-full" />
                    <span>Nidhi</span>
                  </div>
                
                </a>
                <a href="#" className="flex items-center">
                  <div className=' rounded-full shadow-lg mr-2'>
                    <img src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png" alt="photo" className="w-9 h-9 rounded-full" />
                    <span>Sagarika</span>
                  </div>
                 
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
