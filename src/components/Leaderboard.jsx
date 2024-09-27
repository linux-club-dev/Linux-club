// components/Leaderboard.js

"use client";

import { useState, useEffect } from "react";
import { leaderboard } from "@/data/data";
import { motion, AnimatePresence } from "framer-motion";

export default function Leaderboard() {
  const [sortedLeaderboard, setSortedLeaderboard] = useState([]);

  useEffect(() => {
    // Sort leaderboard by points descending
    const sorted = [...leaderboard].sort((a, b) => b.points - a.points);
    setSortedLeaderboard(sorted);
  }, []);

  return (
    <section className="py-20 bg-black">
      <h2 className="mb-12 text-4xl font-bold text-center">Leaderboard</h2>
      <div className="overflow-hidden mx-auto max-w-4xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-700">
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {sortedLeaderboard.map((user, index) => (
                <motion.tr
                  key={user.id}
                  className="border-b border-gray-800 cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.02, backgroundColor: "#1f2937" }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.points}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </section>
  );
}
