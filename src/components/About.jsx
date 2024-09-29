"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { Code, Users, Cpu, Globe } from "lucide-react";
import { useState, useEffect } from "react";

const features = [
  {
    icon: Code,
    title: "Coding Workshops",
    description: "Learn to code with Linux-based tools",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join a thriving open-source community",
  },
  {
    icon: Cpu,
    title: "Hardware Hacking",
    description: "Explore Linux on various platforms",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Contribute to worldwide projects",
  },
];

const pastEvents = [
  {
    title: "Linux Install Fest",
    date: "2023-09-01",
    image: "/images/TheEevent.jpeg",
  },
  {
    title: "Open Source Hackathon",
    date: "2023-10-15",
    image: "/images/TheEventTwo.jpeg",
  },
  {
    title: "Linux Meetup",
    date: "2023-11-25",
    image: "/images/TheEventThree.jpeg",
  },
];

export default function About() {
  const [currentEvent, setCurrentEvent] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % pastEvents.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({ opacity: [0, 1], x: [-20, 0] });
  }, [currentEvent, controls]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative px-4 py-20 overflow-hidden bg-gradient-to-b from-black/50 to-green-900/30"
    >
      <div className="absolute inset-0 bg-gradient-to-b opacity-5 from-black/50 to-green-900/30"></div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 md:text-5xl"
        >
          Discover the Power of Open Source
        </motion.h2>
        <div className="grid gap-12 mb-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="mb-6 text-lg text-gray-300">
              The College Linux Club is a hub of innovation, bringing together
              passionate students to explore the vast world of open-source
              software. Our mission is to empower the next generation of tech
              leaders with the skills and knowledge to shape the future of
              computing.
            </p>
            <p className="text-lg text-gray-300">
              Whether you&apos;re a coding novice or a seasoned developer, our
              club offers a supportive environment to learn, collaborate, and
              contribute to meaningful projects that impact users worldwide.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 text-center rounded-lg shadow-lg backdrop-blur-sm bg-black/30 shadow-green-500/10"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)",
                }}
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="mb-2 text-xl font-semibold text-green-400">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative p-6 overflow-hidden rounded-lg shadow-lg backdrop-blur-sm bg-black/30 shadow-green-500/10"
        >
          <h3 className="mb-6 text-2xl font-bold text-center text-green-400">
            Past Events
          </h3>
          <div className="relative h-64 overflow-hidden rounded-lg">
            <motion.div
              animate={controls}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative justify-center w-full h-full item-center ">
                <Image
                  src={pastEvents[currentEvent].image}
                  alt={pastEvents[currentEvent].title}
                  width={640}
                  height={360}
                  className="object-contain w-full h-full rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h4 className="text-xl font-semibold text-white">
                    {pastEvents[currentEvent].title}
                  </h4>
                  <p className="text-green-400">
                    {pastEvents[currentEvent].date}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {pastEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentEvent(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentEvent ? "bg-green-500" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
