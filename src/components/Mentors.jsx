"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Github, Linkedin, Globe } from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Suyash Bhawsar",
    position: "Senior Linux Kernel Developer",
    image: "/mentors/suyash.jpeg",
    bio: "With over 15 years of experience in Linux kernel development, Dr. Linux has contributed to numerous open-source projects and is a respected figure in the Linux community.",
    expertise: ["Kernel Development", "Device Drivers", "System Performance"],
    github: "https://github.com/drsarahlinux",
    linkedin: "https://linkedin.com/in/drsarahlinux",
    website: "https://sarahlinux.dev",
  },
  {
    id: 2,
    name: "Shubham Khestre",
    position: "Open Source Advocate & UI/UX Expert",
    image: "/mentors/shubham.jpeg",
    bio: "Prof. OpenSource has been at the forefront of open-source design tools for a decade, bridging the gap between beautiful design and open-source philosophy.",
    expertise: ["UI/UX Design", "Open Source Tools", "Community Building"],
    github: "https://github.com/alexopensource",
    linkedin: "https://linkedin.com/in/alexopensource",
    website: "https://alexopensource.com",
  },
  {
    id: 3,
    name: "Aditya Jadhav",
    position: "CEO and Founder at MusiTech",
    image: "/mentors/adityaupdate.jpg",
    bio: "Cmdr. Secure is a renowned expert in Linux system security, with a background in ethical hacking and secure system design.",
    expertise: ["System Hardening", "Penetration Testing", "Security Audits"],
    github: "https://github.com/cmdrmaxsecure",
    linkedin: "https://linkedin.com/in/cmdrmaxsecure",
    website: "https://linuxsecuritypro.com",
  },
  {
    id: 4,
    name: "Raj Raut",
    position: "DevOps Engineer",
    image: "/mentors/raj.jpeg",
    bio: "Eng. DevOps is an expert in creating and managing Linux-based CI/CD pipelines, with a passion for automating everything.",
    expertise: [
      "CI/CD Pipelines",
      "Container Orchestration",
      "Infrastructure as Code",
    ],
    github: "https://github.com/tinadevops",
    linkedin: "https://linkedin.com/in/tinadevops",
    website: "https://devopswizard.tech",
  },
];

export default function Mentors() {
  return (
    <motion.section
      className="py-20 bg-gradient-to-b to-black from-green-900/30"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
          Learn from the Best in Open Source
        </h2>
        <p className="mx-auto mb-16 max-w-3xl text-xl text-center text-gray-300">
          Our mentors are industry leaders, passionate about sharing their
          knowledge and experience with the next generation of open-source
          enthusiasts.
        </p>
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mentor-swiper"
        >
          {mentors.map((mentor) => (
            <SwiperSlide key={mentor.id}>
              <motion.div
                className="overflow-hidden rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 bg-black/30 hover:shadow-green-500/20 hover:bg-green-900/20"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(0, 255, 0, 0.3)",
                }}
              >
                <div className="overflow-hidden relative h-64">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    height={300}
                    width={500}
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-bold text-green-400">
                    {mentor.name}
                  </h3>
                  <p className="mb-4 text-gray-300">{mentor.position}</p>
                  <p className="mb-4 text-gray-400">{mentor.bio}</p>
                  <div className="mb-4">
                    <h4 className="mb-2 text-lg font-semibold text-green-400">
                      Areas of Expertise:
                    </h4>
                    <ul className="list-disc list-inside text-gray-300">
                      {mentor.expertise.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <a
                      href={mentor.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-green-400"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                    <a
                      href={mentor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-green-400"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                      href={mentor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-green-400"
                    >
                      <Globe className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <style jsx global>{`
        .mentor-swiper {
          padding-bottom: 60px;
        }
        .mentor-swiper .swiper-pagination-bullet {
          background-color: #22c55e;
        }
        .mentor-swiper .swiper-button-next,
        .mentor-swiper .swiper-button-prev {
          color: #22c55e;
        }
      `}</style>
    </motion.section>
  );
}
