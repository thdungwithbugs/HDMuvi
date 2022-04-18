import React from "react";
import { BsGithub } from "react-icons/bs";
import { SiFacebook } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center mb-10">
      <div className="header flex items-center justify-center gap-x-5 text-white py-4 mb-1">
        <div className="text-xl font-bold text-secondary border border-secondary p-1 bg-black ">
          HDmuvi
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
        <p>
          A simple website was coded by Hoang Dung using React, TailwindCss and
          The MovieDB API. Reference from Evondev.
        </p>
      </div>
      <div className="footer_link flex gap-x-3">
        <div className="footer__socials">
          <a
            href="https://www.facebook.com/dung.hoangtruong.5/"
            target="_blank"
            rel="noreferrer"
          >
            <SiFacebook className="cursor-pointer hover:text-primary transition-all"> </SiFacebook>
          </a>
        </div>
        <div className="footer__socials">
          <a
            href="https://github.com/thdungwithbugs/HDMuvi"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub className="cursor-pointer hover:text-primary transition-all"> </BsGithub>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
