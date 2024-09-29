"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      path: "https://github.com/linux-club-dev",
      ariaLabel: "GitHub",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      path: "https://linkedin.com/company/thelinux-club",
      ariaLabel: "LinkedIn",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      path: "https://twitter.com/i/communities/1607126742795448320",
      ariaLabel: "Twitter",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      path: "mailto:linuxclub.pune@gmail.com",
      ariaLabel: "Email",
    },
    {
      icon: <InstagramLogoIcon className="w-5 h-5" />,
      path: "https://www.instagram.com/the_linux.club",
      ariaLabel: "Instagram",
    },
  ];

  return (
    <footer className="py-8 bg-black shadow-md">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between mb-8 md:flex-row">
          <motion.div
            className="flex flex-col items-center mb-6 md:items-start md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center mb-2">
              <Image
                src="/images/logo.jpeg"
                alt="Linux Club Logo"
                width={24}
                height={24}
                className="mr-2 rounded-full"
              />
              <span className="text-lg font-bold text-white">Linux Club</span>
            </Link>
            <p className="max-w-xs text-sm text-center text-gray-400 md:text-left">
              Where Innovation Meets Execution.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center md:items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-2 text-sm font-semibold text-gray-300">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.ariaLabel}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="text-gray-400 transition-colors duration-200 cursor-pointer hover:text-green-500"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="pt-4 text-xs text-center text-gray-500 border-t border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          © {currentYear} Linux Club. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
