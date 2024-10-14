import React from "react";
import { motion } from "framer-motion";

const TuxMascot = () => (
  <motion.div
    className="fixed bottom-4 right-4 w-16 h-16"
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  ></motion.div>
);

export default TuxMascot;
