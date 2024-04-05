'use client'
import { useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <header className="flex justify-between items-center top-0 z-10 sticky border-b border-gray-800 mx-auto bg-transparent backdrop-blur-sm px-4 py-5">
      <h1 className="text-white font-bold text-xl">CodeFusion</h1>
      <ul className="flex gap-6 list-none">
        <li>
          <a href="#" className="text-white hover:text-violet-500">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-violet-500">
            Projects
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-violet-500">
            Dev
          </a>
        </li>
        {isLoggedIn ? (
          <li>
            <a href="#" className="text-white hover:text-violet-500">
              Profile
            </a>
          </li>
        ) : (
          <li>
            <a href="#" className="text-white hover:text-violet-500">
              Login
            </a>
          </li>
        )}
      </ul>
    </header>
  );
}
