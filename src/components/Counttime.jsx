"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
    <motion.div
      key={interval}
      className="flex flex-col items-center mx-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center justify-center w-24 h-24 mb-2 border rounded-lg bg-green-900/30 border-green-500/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-4xl font-bold text-green-400">
          {value.toString().padStart(2, "0")}
        </span>
      </motion.div>
      <span className="text-sm text-gray-400">{interval}</span>
    </motion.div>
  ));

  return (
    <div className="flex flex-wrap items-center justify-center">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl text-green-400"
        >
          Event has started!
        </motion.span>
      )}
    </div>
  );
};

export default Countdown;
