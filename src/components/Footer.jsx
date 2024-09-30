"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      icon: Github,
      path: "https://github.com/linux-club-dev",
      ariaLabel: "GitHub",
    },
    {
      icon: Linkedin,
      path: "https://linkedin.com/company/thelinux-club",
      ariaLabel: "LinkedIn",
    },
    {
      icon: Twitter,
      path: "https://twitter.com/i/communities/1607126742795448320",
      ariaLabel: "Twitter",
    },
    { icon: Mail, path: "mailto:linuxclub.pune@gmail.com", ariaLabel: "Email" },
    {
      icon: InstagramLogoIcon,
      path: "https://www.instagram.com/the_linux.club",
      ariaLabel: "Instagram",
    },
  ];

  return (
    <footer
      className="relative bottom-0 flex w-full py-4 bg-black shadow-md"
      aria-label="Site footer"
    >
      <div className="w-full px-4 mx-auto sm:px-6 lg:px-8 ">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {socialLinks.slice(0, 3).map((link) => (
              <a
                key={link.ariaLabel}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="text-gray-400 transition-colors duration-200 hover:text-green-500"
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/" className="flex items-center mb-2">
              <Image
                src="/images/logo.jpeg"
                alt="Linux Club Logo"
                width={24}
                height={24}
                className="mr-2 rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/fallback-logo.png";
                }}
              />
              <span className="text-lg font-bold text-white">Linux Club</span>
            </Link>
            <p className="text-xs text-center text-gray-400">
              Learn, Share, and Grow
            </p>
          </motion.div>

          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {socialLinks.slice(3).map((link) => (
              <a
                key={link.ariaLabel}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="text-gray-400 transition-colors duration-200 hover:text-green-500"
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
