import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50 text-gray-800">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Welcome</h1>

        <p className="text-lg">
          Hi there! I'm Audrey, a Computer Science graduate from{" "}
          <strong>Colorado School of Mines</strong>, and I've always enjoyed
          bringing creativity into both code and canvas. This website is a
          personal project that blends my love for technology and art.
        </p>

        <p className="text-lg">
          Here you'll find a portfolio of my work — primarily{" "}
          <strong>acrylic paintings</strong>, along with{" "}
          <strong>fiber arts</strong> like sewing and crochet, and a few{" "}
          <strong>sculptures</strong>. Use the top navigation bar to browse
          through each collection.
        </p>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Let's Connect</h2>
          <ul className="space-y-2 text-blue-600">
            <li className="flex items-center gap-2">
              <FaLinkedin className="text-blue-700" />
              <a
                href="https://www.linkedin.com/in/audrey-powers-62a955261"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaGithub className="text-gray-700" />
              <a
                href="https://github.com/Powers189"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-red-500" />
              <a href="mailto:youremail@example.com">
                audreypowers189@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
