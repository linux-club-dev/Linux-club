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
    const hardcodedContributors = [
      {
        id: 1,
        username: "s41r4j",
        avatarUrl: "https://github.com/s41r4j.png",
        contributions: 127,
      },
      {
        id: 2,
        username: "vdcds",
        avatarUrl: "https://github.com/vdcds.png",
        contributions: 98,
      },
      {
        id: 3,
        username: "pratik-mahalle",
        avatarUrl: "https://github.com/pratik-mahalle.png",
        contributions: 76,
      },
      {
        id: 4,
        username: "GhanashyamKadam",
        avatarUrl: "https://github.com/GhanashyamKadam.png",
        contributions: 65,
      },
      {
        id: 5,
        username: "aniketj14",
        avatarUrl: "https://github.com/aniketj14.png",
        contributions: 54,
      },
      {
        id: 6,
        username: "Abhishekkatale",
        avatarUrl: "https://github.com/Abhishekkatale.png",
        contributions: 43,
      },
      {
        id: 7,
        username: "prathamesh-pichkate",
        avatarUrl: "https://github.com/prathamesh-pichkate.png",
        contributions: 32,
      },
    ];

    const hardcodedRepositories = [
      {
        id: 1,
        name: "terraform-eks",
        description: "Terraform scripts for EKS deployment",
        stars: 45,
        forks: 12,
        language: "HCL",
        url: "https://github.com/pratik-mahalle/terraform-eks",
      },
      {
        id: 2,
        name: "Linclubwebsite",
        description: "Official website for Linux Club",
        stars: 32,
        forks: 8,
        language: "JavaScript",
        url: "https://github.com/Vdcds/Linclubwebsite",
      },
      {
        id: 3,
        name: "blog_website",
        description: "A simple blog website template",
        stars: 28,
        forks: 5,
        language: "HTML",
        url: "https://github.com/Abhishekkatale/blog_website",
      },
      {
        id: 4,
        name: "Hashing",
        description: "Implementation of various hashing algorithms",
        stars: 19,
        forks: 3,
        language: "Python",
        url: "https://github.com/GhanashyamKadam/Hashing",
      },
    ];

    setContributors(hardcodedContributors);
    setRepositories(hardcodedRepositories);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-gradient-to-b from-gray-900 to-black">
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
          className="p-4 mb-16 overflow-hidden bg-black rounded-lg shadow-lg"
        >
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 mr-2 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 mr-2 bg-yellow-500 rounded-full"></div>
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
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg bg-opacity-80 backdrop-blur-sm">
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
                className="p-6 transition-all duration-300 bg-gray-800 rounded-lg shadow-lg bg-opacity-80 backdrop-blur-sm hover:shadow-green-500/50"
              >
                <h3 className="mb-2 text-xl font-bold text-green-400">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {repo.name}
                  </a>
                </h3>
                <p className="mb-4 text-gray-300">{repo.description}</p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center">
                    <GitFork className="w-4 h-4 mr-1" />
                    {repo.forks}
                  </span>
                  <span className="flex items-center">
                    <Code className="w-4 h-4 mr-1" />
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
            className="p-6 bg-gray-800 rounded-lg shadow-lg bg-opacity-80 backdrop-blur-sm"
          >
            <h3 className="mb-4 text-xl font-bold text-green-400">
              How to Contribute
            </h3>
            <ol className="space-y-2 text-gray-300 list-decimal list-inside">
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
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Being respectful and inclusive of all community members</li>
              <li>Providing constructive feedback</li>
              <li>Focusing on what is best for the community</li>
              <li>Showing empathy towards other community members</li>
            </ul>
            <Link
              href="/code-of-conduct"
              className="inline-flex items-center mt-4 text-green-400 transition-colors hover:text-green-300"
            >
              Read full Code of Conduct <ArrowRight className="w-4 h-4 ml-2" />
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
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-black transition-all duration-300 transform rounded-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:scale-105"
          >
            <Github className="w-5 h-5 mr-2" />
            Start Contributing Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
