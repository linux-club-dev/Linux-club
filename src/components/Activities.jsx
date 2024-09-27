"use client";

import { motion } from "framer-motion";
import { Code, Users, Cpu, Globe, ArrowRight } from "lucide-react";

const activities = [
  {
    icon: Code,
    title: "Coding Workshops",
    description:
      "Dive deep into Linux development with hands-on coding sessions",
    category: "Workshop",
  },
  {
    icon: Users,
    title: "Hackathons",
    description: "Collaborate on innovative projects in our themed hackathons",
    category: "Event",
  },
  {
    icon: Cpu,
    title: "Hardware Lab",
    description: "Experiment with Linux on various hardware platforms",
    category: "Lab",
  },
  {
    icon: Globe,
    title: "Open Source Sprints",
    description: "Contribute to global open-source projects as a team",
    category: "Project",
  },
];

export default function Activities() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="overflow-hidden relative px-4 py-20 bg-gradient-to-b from-black/50 to-green-900/30"
    >
      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-5"></div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 md:text-5xl"
        >
          Engage in Cutting-Edge Activities
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
              className="overflow-hidden rounded-lg backdrop-blur-sm transition-all duration-300 bg-black/30 hover:shadow-lg hover:shadow-green-500/20"
            >
              <div className="p-6">
                <span className="px-2 py-1 text-xs font-semibold text-green-400 rounded-full bg-green-900/30">
                  {activity.category}
                </span>
                <activity.icon className="mt-4 mb-2 w-12 h-12 text-green-500" />
                <h3 className="mb-2 text-lg font-semibold text-gray-100">
                  {activity.title}
                </h3>
                <p className="mb-4 text-sm text-gray-400">
                  {activity.description}
                </p>
                <motion.a
                  href="#"
                  className="inline-flex items-center text-green-400 transition-colors hover:text-green-300"
                  whileHover={{ x: 5 }}
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
