import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800">
      <div className="max-w-7xl mx-auto w-11/12">
        <div className="flex flex-col lg:flex-row justify-between py-8">
          {/* Left Half */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <span className="text-2xl">CodeFusion</span>
            <p className="mt-4 text-center lg:text-left text-gray-200 dark:text-gray-400">
              CodeFusion revolutionizes project showcasing and collaboration for
              college students. With easy project uploads, powerful
              collaboration tools, and seamless social networking integration,
              it empowers students to connect, innovate, and excel academically
              and professionally.
            </p>

            <div className="flex py-4 gap-4 text-2xl">
              <FaGithub />
              <FaLinkedin />
            </div>
          </div>

          {/* Right Half */}
          <div className="w-full lg:w-1/2 flex justify-end mr-5">
            {" "}
            {/* Changed justify-end */}
            <div className="lg:text-right">
              <h3 className="text-center lg:text-left text-2xl">
                Documentation
              </h3>
              <ul className="mt-4 text-center lg:text-left">
                <li>
                  <a href="#" className="text-gray-300 hover:text-violet-500">
                    Contributing Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-violet-500">
                    Add Projects Via GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-violet-500">
                    Run the Project Locally
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
