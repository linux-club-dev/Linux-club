"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Blogs", path: "/blogs" },
    { name: "Team", path: "/team" },
    { name: "Open Source", path: "/open-source" },
  ];

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-white">
              <Image
                src="/images/logo.jpeg"
                alt="Linux Club Logo"
                width={40}
                height={40}
                className="mr-2 rounded-full"
              />
              <div className="hidden sm:block">
                <div className="text-lg font-bold md:text-xl">Linux Club</div>
                <div className="text-xs text-gray-400">
                  PES&apos;s College of Engineering
                </div>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-baseline ml-10 space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="px-3 py-2 text-sm font-medium text-gray-300 transition-colors duration-200 rounded-md hover:text-green-400"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <X className="block w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="block w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-green-400"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default NavBar;
