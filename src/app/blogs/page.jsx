"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Calendar, Eye } from "lucide-react";
import Link from "next/link";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockBlogs = [
      {
        id: "1",
        title: "Getting Started with Linux: A Beginner's Guide",
        brief:
          "Learn the basics of Linux and start your journey into open-source.",
        slug: "getting-started-with-linux",
        dateAdded: "2023-09-15",
        coverImage: "/placeholder.svg?height=200&width=400",
        readTime: "5 min read",
      },
      {
        id: "2",
        title: "Advanced Bash Scripting Techniques",
        brief:
          "Take your Bash scripting skills to the next level with these pro tips.",
        slug: "advanced-bash-scripting-techniques",
        dateAdded: "2023-09-22",
        coverImage: "/placeholder.svg?height=200&width=400",
        readTime: "8 min read",
      },
      {
        id: "3",
        title: "Linux Security Best Practices",
        brief:
          "Protect your Linux system with these essential security measures.",
        slug: "linux-security-best-practices",
        dateAdded: "2023-09-29",
        coverImage: "/placeholder.svg?height=200&width=400",
        readTime: "6 min read",
      },
      {
        id: "4",
        title: "Creating a Custom Linux Distro",
        brief: "Learn how to build your own Linux distribution from scratch.",
        slug: "creating-custom-linux-distro",
        dateAdded: "2023-10-05",
        coverImage: "/placeholder.svg?height=200&width=400",
        readTime: "10 min read",
      },
    ];

    setBlogs(mockBlogs);
    setLoading(false);
  }, []);

  return (
    <section className="overflow-hidden relative py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-10 z-0"></div>
      <div className="container relative z-10 px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-4xl font-bold text-center text-green-400 md:text-5xl"
        >
          Latest Insights from Our Tech Wizards
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-32 h-32 rounded-full border-t-2 border-b-2 border-green-500 animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden bg-gray-800 rounded-lg shadow-lg transition-all duration-300 transform hover:shadow-green-500/50 hover:-translate-y-2"
              >
                <div className="relative h-48 bg-gray-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-75"></div>
                  <div className="flex absolute inset-0 justify-center items-center">
                    <h3 className="px-4 text-2xl font-bold text-center text-white">
                      {blog.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6 border-t-4 border-green-500">
                  <div className="flex items-center mb-4">
                    <Terminal className="mr-2 w-5 h-5 text-green-400" />
                    <span className="font-mono text-sm text-green-400">
                      ~/blogs/{blog.slug}
                    </span>
                  </div>
                  <p className="mb-4 text-gray-300">{blog.brief}</p>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="mr-1 w-4 h-4" />
                      <span>{blog.dateAdded}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="mr-1 w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  <Link
                    href={`https://hashnode.com/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-green-400 transition-colors hover:text-green-300"
                  >
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="https://hashnode.com/your-club-page"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-black bg-gradient-to-r from-green-400 to-blue-500 rounded-md transition-all duration-300 transform hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:scale-105"
          >
            Explore All Blog Posts
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
