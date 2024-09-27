// components/LatestImages.js

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "/images/event1.jpg",
  "/images/event2.jpg",
  "/images/event3.jpg",
];

export default function LatestImages() {
  return (
    <section className="py-20 bg-black">
      <h2 className="mb-12 text-4xl font-bold text-center">Latest Images</h2>
      <div className="grid grid-cols-1 gap-6 mx-auto max-w-6xl md:grid-cols-3">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={src}
              alt={`Event Image ${index + 1}`}
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
