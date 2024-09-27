"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image"; // Import Image component

const blogPosts = [
  {
    title: "Mastering the Linux Command Line",
    date: "2023-09-15",
    image: "/placeholder.svg?height=200&width=300",
    category: "Tutorial",
  },
  {
    title: "Open Source AI: The Future of Machine Learning",
    date: "2023-09-22",
    image: "/placeholder.svg?height=200&width=300",
    category: "Technology",
  },
  {
    title: "Securing Your Linux Server: Best Practices",
    date: "2023-09-29",
    image: "/placeholder.svg?height=200&width=300",
    category: "Security",
  },
  {
    title: "Containerization with Docker on Linux",
    date: "2023-10-05",
    image: "/placeholder.svg?height=200&width=300",
    category: "DevOps",
  },
];

export default function RecentBlogs() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="overflow-hidden relative px-4 py-20 bg-gradient-to-b from-green-900/30 to-black/50"
    >
      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-5"></div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 md:text-5xl"
        >
          Latest Insights & Blogs
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
              className="overflow-hidden rounded-lg backdrop-blur-sm transition-all duration-300 bg-black/30 hover:shadow-lg hover:shadow-green-500/20"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={500} // Specify width
                height={300} // Specify height
              />
              <div className="p-4">
                <span className="px-2 py-1 text-xs font-semibold text-green-400 rounded-full bg-green-900/30">
                  {post.category}
                </span>
                <h3 className="mt-2 mb-1 text-lg font-semibold text-gray-100">
                  {post.title}
                </h3>
                <p className="mb-4 text-sm text-gray-400">{post.date}</p>
                <motion.a
                  href="#"
                  className="inline-flex items-center text-green-400 transition-colors hover:text-green-300"
                  whileHover={{ x: 5 }}
                >
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
