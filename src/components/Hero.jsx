"use client";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import Animation from "@/components/Animation";
export default function Hero() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".terminal-text", {
        text: "Welcome to the College Linux Club",
        duration: 2,
        delay: 0.5,
        ease: "power1.in",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      ref={targetRef}
      style={{ opacity, scale, y }}
      className="flex overflow-hidden relative justify-center items-center min-h-screen"
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black to-black via-green-900/20"></div>
      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-5 z-0"></div>

      <div className="relative z-20 px-4 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative mb-8"
        >
          <Terminal className="mx-auto w-24 h-24 text-green-500 md:w-32 md:h-32" />
        </motion.div>

        <h1 className="mb-6 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 md:text-6xl lg:text-7xl">
          The Linux Club
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="mb-12 text-xl text-gray-300 md:text-2xl"
        >
          Learn Grow and Share with linux club
        </motion.p>
        <a href="https://t.me/Linux_Users_Club">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 text-lg font-bold text-black bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-300 hover:from-green-400 hover:to-blue-400"
          >
            Join Us
          </motion.button>
        </a>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8 text-green-500" />
      </motion.div>
    </motion.section>
  );
}
