"use client";
import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

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
      path: "https://www.instargam.com/the_linux.club",
      ariaLabel: "Instagram",
    },
  ];

  return (
    <footer className="flex relative bottom-0 py-4 bg-black shadow-md">
      <div className="px-8 mx-20 max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center mb-2">
              <Terminal className="mr-2 w-6 h-6 text-green-500" />
              <span className="text-lg font-bold text-white">Linux Club</span>
            </Link>
            <p className="text-xs text-center text-gray-400 md:text-left">
              Empowering through open-source at Pune Edu Society&apos;s College
              of Engineering.
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex flex-col items-end"
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
                  className="text-gray-400 transition-colors duration-200 hover:text-green-500"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="pt-4 mt-6 text-xs text-center text-gray-500 border-t border-gray-800"
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
