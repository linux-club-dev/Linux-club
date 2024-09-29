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

export const mentors = [
  {
    id: 1,
    name: "Suyash Bhawsar",
    position: "Founder of DevOps Dynamic Agency",
    image: "/mentors/suyash.jpeg",
    bio: "Suyash Bhawsar is the founder of DevOps Dynamic Agency on Upwork, specializing in DevOps and its associated tools. With extensive expertise in automation, CI/CD pipelines, cloud infrastructure management, and container orchestration, Suyash has successfully led numerous projects, helping businesses optimize their development workflows and scale their operations efficiently. His agency, known for its top-tier service and client satisfaction, has established itself as a trusted partner for companies looking to enhance their DevOps capabilities.",
    expertise: [
      "DevOps Engineering",
      "CI/CD Pipeline Implementation",
      "Cloud Infrastructure Management (AWS, Azure, GCP)",
    ],
    github: "https://github.com/suyashbhawsar",
    linkedin: "https://linkedin.com/in/suyashbhawsar",
    website: "https://devopsdynamic.agency",
  },
  {
    id: 2,
    name: "Shubham Khestre",
    position: "Junior DevOps Engineer at FlairMinds",
    image: "/mentors/shubham.jpeg",
    bio: "Shubham Khestre is a Junior DevOps Engineer at FlairMinds, specializing in optimizing and automating development processes. With a solid foundation in cloud infrastructure, continuous integration, and deployment, he plays a key role in streamlining workflows and enhancing system reliability. Passionate about technology and innovation, Shubham is dedicated to improving the efficiency and scalability of digital solutions.",
    expertise: [
      "DevOps",
      "CI/CD",
      "Infrastructure as Code",
      "Docker",
      "Kubernetes",
    ],
    github: "https://github.com/shubhamkhestre",
    linkedin: "https://linkedin.com/in/shubhamkhestre",
    website: "https://flairminds.com",
  },
  {
    id: 3,
    name: "Aditya Jadhav",
    position: "Founder of MusiTech",
    image: "/mentors/adityaupdate.jpg",
    bio: "Aditya Jadhav is the Founder of MusiTech, leading a dynamic team committed to driving digital innovation and excellence. With expertise in digital marketing and content creation, Aditya combines a deep understanding of the digital landscape with a passion for creativity. His leadership ensures MusiTech remains at the forefront of industry trends, consistently delivering impactful and trend-setting digital solutions for clients.",
    expertise: ["Digital Marketing", "Team Management", "Content Creation"],
    github: "https://github.com/adityajadhav",
    linkedin: "https://linkedin.com/in/adityajadhav",
    website: "https://musitech.com",
  },
  {
    id: 4,
    name: "Raj Raut",
    position: "DevOps Engineer at DuploCloud",
    image: "/mentors/raj.jpeg",
    bio: "Raj Raut is a DevOps Engineer at DuploCloud, specializing in cloud technologies and infrastructure management. With a deep understanding of cloud platforms and services, he excels in designing and implementing scalable, secure, and efficient cloud solutions. Raj is adept at optimizing cloud resources, automating deployments, and ensuring high availability of applications. His expertise in cloud architecture and DevOps practices makes him a valuable asset in driving innovation and operational excellence.",
    expertise: [
      "Cloud Architecture",
      "Infrastructure as Code",
      "AWS, GCP, Azure",
      "Docker and Kubernetes",
      "Monitoring and Logging",
      "Ansible",
    ],
    github: "https://github.com/rajraut",
    linkedin: "https://linkedin.com/in/rajraut",
    website: "https://duplocloud.com",
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
          Learn from the our mentors
        </h2>
        <p className="max-w-3xl mx-auto mb-16 text-xl text-center text-gray-300">
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
                className="overflow-hidden transition-all duration-300 rounded-lg shadow-lg backdrop-blur-sm bg-black/30 hover:shadow-green-500/20 hover:bg-green-900/20"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(0, 255, 0, 0.3)",
                }}
              >
                <div className="relative h-64 overflow-hidden">
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
                    <ul className="text-gray-300 list-disc list-inside">
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
