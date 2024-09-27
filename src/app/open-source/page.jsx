"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  Users,
  Book,
  Code,
  ArrowRight,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function OpenSource() {
  const [contributors, setContributors] = useState([]);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    // Fetch data from GitHub API in a real application
    // For this example, we'll use mock data
    const mockContributors = [
      {
        id: 1,
        username: "linuxmaster",
        avatarUrl: "/placeholder.svg?height=50&width=50",
        contributions: 127,
      },
      {
        id: 2,
        username: "opensourcehero",
        avatarUrl: "/placeholder.svg?height=50&width=50",
        contributions: 98,
      },
      {
        id: 3,
        username: "codegenius",
        avatarUrl: "/placeholder.svg?height=50&width=50",
        contributions: 76,
      },
      {
        id: 4,
        username: "gitguru",
        avatarUrl: "/placeholder.svg?height=50&width=50",
        contributions: 65,
      },
      {
        id: 5,
        username: "devchampion",
        avatarUrl: "/placeholder.svg?height=50&width=50",
        contributions: 54,
      },
    ];

    const mockRepositories = [
      {
        id: 1,
        name: "awesome-linux-tools",
        description: "A curated list of awesome Linux tools and resources",
        stars: 1200,
        forks: 300,
        language: "Markdown",
      },
      {
        id: 2,
        name: "linux-kernel-module",
        description: "Example Linux kernel module for educational purposes",
        stars: 800,
        forks: 150,
        language: "C",
      },
      {
        id: 3,
        name: "bash-scripting-guide",
        description: "Comprehensive guide to Bash scripting",
        stars: 650,
        forks: 120,
        language: "Shell",
      },
      {
        id: 4,
        name: "linux-system-monitor",
        description: "A beautiful system monitor for Linux desktops",
        stars: 450,
        forks: 80,
        language: "Python",
      },
    ];

    setContributors(mockContributors);
    setRepositories(mockRepositories);
  }, []);

  return (
    <div className="overflow-hidden relative min-h-screen text-white bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-5 z-0"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black via-green-900/20"></div>
      <div className="container relative z-20 px-4 py-16 mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-5 mb-8 text-4xl font-bold text-center text-green-400 md:text-5xl"
        >
          Open Source at Linux Club
        </motion.h1>

        {/* Animated Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden p-4 mb-16 bg-black rounded-lg shadow-lg"
        >
          <div className="flex items-center mb-2">
            <div className="mr-2 w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="mr-2 w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <pre className="font-mono text-sm md:text-base">
            <code className="text-green-400">
              $ git clone https://github.com/linux-club/awesome-project.git
              <br />
              $ cd awesome-project
              <br />
              $ npm install
              <br />
              $ npm start
              <br />
              <span className="text-white">
                Server running at http://localhost:3000
              </span>
            </code>
          </pre>
        </motion.div>

        {/* Leaderboard Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-green-300">
            Top Contributors
          </h2>
          <div className="p-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg backdrop-blur-sm">
            <table className="w-full">
              <thead>
                <tr className="text-left text-green-400">
                  <th className="py-2">Rank</th>
                  <th>Username</th>
                  <th>Contributions</th>
                </tr>
              </thead>
              <tbody>
                {contributors.map((contributor, index) => (
                  <motion.tr
                    key={contributor.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-t border-gray-700"
                  >
                    <td className="py-2">{index + 1}</td>
                    <td className="flex items-center">
                      <Image
                        src={contributor.avatarUrl}
                        alt={contributor.username}
                        width={32}
                        height={32}
                        className="mr-2 rounded-full"
                      />
                      {contributor.username}
                    </td>
                    <td>{contributor.contributions}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Top Repositories Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-green-300">
            Top Repositories
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {repositories.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-green-500/50"
              >
                <h3 className="mb-2 text-xl font-bold text-green-400">
                  {repo.name}
                </h3>
                <p className="mb-4 text-gray-300">{repo.description}</p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span className="flex items-center">
                    <Star className="mr-1 w-4 h-4" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center">
                    <GitFork className="mr-1 w-4 h-4" />
                    {repo.forks}
                  </span>
                  <span className="flex items-center">
                    <Code className="mr-1 w-4 h-4" />
                    {repo.language}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contribution Guidelines Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-green-300">
            Contribution Guidelines
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="p-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg backdrop-blur-sm"
          >
            <h3 className="mb-4 text-xl font-bold text-green-400">
              How to Contribute
            </h3>
            <ol className="space-y-2 list-decimal list-inside text-gray-300">
              <li>Fork the repository you want to contribute to</li>
              <li>Create a new branch for your feature or bug fix</li>
              <li>
                Make your changes and commit them with a clear commit message
              </li>
              <li>Push your changes to your fork</li>
              <li>Submit a pull request to the original repository</li>
            </ol>
            <h3 className="mt-6 mb-4 text-xl font-bold text-green-400">
              Code of Conduct
            </h3>
            <p className="mb-4 text-gray-300">
              We expect all contributors to adhere to our Code of Conduct. This
              includes:
            </p>
            <ul className="space-y-2 list-disc list-inside text-gray-300">
              <li>Being respectful and inclusive of all community members</li>
              <li>Providing constructive feedback</li>
              <li>Focusing on what is best for the community</li>
              <li>Showing empathy towards other community members</li>
            </ul>
            <Link
              href="/code-of-conduct"
              className="inline-flex items-center mt-4 text-green-400 transition-colors hover:text-green-300"
            >
              Read full Code of Conduct <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="https://github.com/linux-club-dev"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-black bg-gradient-to-r from-green-400 to-blue-500 rounded-md transition-all duration-300 transform hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:scale-105"
          >
            <Github className="mr-2 w-5 h-5" />
            Start Contributing Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
