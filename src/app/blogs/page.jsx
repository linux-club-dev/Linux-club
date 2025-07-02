"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Calendar, Eye } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/blogs");

        if (response.data && response.data.blogs) {
          // Transform the blog data to match your UI requirements
          const transformedBlogs = response.data.blogs.map((blog) => ({
            id: blog._id,
            title: blog.title,
            brief: `Check out this article on ${blog.title.toLowerCase()}.`,
            slug: blog.title
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]+/g, ""),
            dateAdded: new Date(blog.createdAt).toISOString().split("T")[0],
            coverImage: "/placeholder.svg?height=200&width=400",
            readTime: `${Math.max(
              3,
              Math.floor(blog.title.length / 5)
            )} min read`,
            link: blog.link,
          }));

          setBlogs(transformedBlogs);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");

        // Set fallback data
        setBlogs([
          {
            id: "fallback-1",
            title: "Getting Started with Linux: A Beginner's Guide",
            brief:
              "Learn the basics of Linux and start your journey into open-source.",
            slug: "getting-started-with-linux",
            dateAdded: "2023-09-15",
            coverImage: "/placeholder.svg?height=200&width=400",
            readTime: "5 min read",
            link: "https://medium.com/linuxclub/getting-started-with-linux-beginners-guide",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-10 z-0"></div>
      <div className="container relative z-10 px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-4xl font-bold text-center text-green-400 md:text-5xl"
        >
          Tech Articles we recommend
          <span className="text-white"> Cureated by us. for you</span>
        </motion.h2>

        {error && (
          <div className="p-4 mb-8 text-center text-red-400 rounded-md bg-red-900/20">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-32 h-32 border-t-2 border-b-2 border-green-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="overflow-hidden transition-all duration-300 transform bg-gray-800 rounded-lg shadow-lg hover:shadow-green-500/50 hover:-translate-y-2"
                >
                  <div className="relative h-48 bg-gray-700">
                    <div className="absolute inset-0 opacity-75 bg-gradient-to-br from-green-400 to-blue-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="px-4 text-2xl font-bold text-center text-white">
                        {blog.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 border-t-4 border-green-500">
                    <div className="flex items-center mb-4">
                      <Terminal className="w-5 h-5 mr-2 text-green-400" />
                      <span className="font-mono text-sm text-green-400">
                        ~/blogs/{blog.slug}
                      </span>
                    </div>
                    <p className="mb-4 text-gray-300">{blog.brief}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{blog.dateAdded}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                    <Link
                      href={blog.link || `https://medium.com/${blog.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 text-green-400 transition-colors hover:text-green-300"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 p-8 text-center text-gray-400 border border-gray-700 rounded-lg">
                <Terminal className="w-10 h-10 mx-auto mb-4 text-green-500 opacity-50" />
                <p className="text-xl">No blogs found.</p>
                <p className="mt-2">Check back soon for new content!</p>
              </div>
            )}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="https://medium.com/linuxclub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-black transition-all duration-300 transform rounded-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:scale-105"
          >
            Explore All Blog Posts
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
