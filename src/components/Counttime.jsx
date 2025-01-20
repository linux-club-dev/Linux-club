"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = useCallback(() => {
    if (!targetDate) {
      return null;
    }

    try {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();

      // If the date is invalid or has passed, return null
      if (isNaN(target) || target - now <= 0) {
        return null;
      }

      const difference = target - now;

      return {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    } catch (error) {
      console.error("Error calculating time left:", error);
      return null;
    }
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    // Reset timeLeft when targetDate changes
    setTimeLeft(calculateTimeLeft());

    // Only set up the interval if we have a valid target date
    if (!targetDate) return;

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      // Clear interval if the event has passed
      if (!remaining) {
        clearInterval(timer);
      }
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [targetDate, calculateTimeLeft]);

  if (!targetDate) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl text-green-400"
      >
        No upcoming events
      </motion.div>
    );
  }

  if (!timeLeft) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl text-green-400"
      >
        Event has started!
      </motion.div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center">
      {Object.entries(timeLeft).map(([interval, value]) => (
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
      ))}
    </div>
  );
};

export default Countdown;
