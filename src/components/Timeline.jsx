// components/Timeline.js

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { events } from "@/data/data";

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      <section className="py-20">
        <h2 className="mb-12 text-4xl font-bold text-center">Event Timeline</h2>
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-1/2 h-full border-l-2 border-green-500 transform -translate-x-1/2"></div>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className={`mb-8 flex justify-between items-center w-full ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="order-1 w-5/12"></div>
              <div
                className="flex z-20 order-1 items-center w-8 h-8 bg-green-500 rounded-full shadow-xl cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <h1 className="mx-auto text-lg font-semibold text-white">
                  {event.id}
                </h1>
              </div>
              <div
                className="order-1 px-6 py-4 w-5/12 bg-gray-800 rounded-lg shadow-xl cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <h3 className="mb-1 text-xl font-bold text-white">
                  {event.title}
                </h3>
                <p className="text-sm tracking-wide leading-snug text-gray-300 text-opacity-100">
                  {event.date}
                </p>
                <p className="mt-3 text-gray-300">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
