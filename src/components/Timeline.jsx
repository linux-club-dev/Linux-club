// components/Timeline.js

"use client";

import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [index, setindex] = useState(1);
  const getEvents = async () => {
    try {
      const response = await axios.get("/api/admin/events");
      const data = await response.data;
      console.log(data);
      setEvents(data.events);
    } catch (galti) {
      console.log(galti);
      console.log("Boooo Skill Issue !! ");
    }
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <section className="py-20">
        <h2 className="mb-12 text-4xl font-bold text-center">Event Timeline</h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute h-full transform -translate-x-1/2 border-l-2 border-green-500 left-1/2"></div>
          {events.map((event, index) => (
            <motion.div
              key={event._id}
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
                className="z-20 flex items-center order-1 w-8 h-8 bg-green-500 rounded-full shadow-xl cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <h1 className="mx-auto text-lg font-semibold text-white">
                  {index + 1}
                </h1>
              </div>
              <div
                className="order-1 w-5/12 px-6 py-4 bg-gray-800 rounded-lg shadow-xl cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <h3 className="mb-1 text-xl font-bold text-white">
                  {event.EventName}
                </h3>
                <p className="text-sm leading-snug tracking-wide text-gray-300 text-opacity-100">
                  {event.EventDate} at {event.EventTime}
                </p>
                <p>catch this event at {event.EventVenue}</p>
                <p className="mt-3 text-gray-300">{event.EventDescription}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
