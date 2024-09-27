"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const CoreTeam = () => {
  const teamMembers = [
    {
      name: "Vrushali Kudande",
      title: "President",
      img: "/coreteam/vrushali.jpg", // Updated path
      github: "https://github.com/",
      linkedin: "https://www.linkedin.com/in/vrushalikudande/",
      twitter: "https://twitter.com/vrushalikudande",
    },
    {
      name: "Pratik Mahalle",
      title: "Vice President",
      img: "/coreteam/pratik.jpeg", // Updated path
      github: "https://github.com/pratikmahalle",
      linkedin: "https://www.linkedin.com/in/pratikmahalle/",
      twitter: "https://twitter.com/pratikmahalle",
    },
    {
      name: "Ghanshyam kadam",
      title: "Secretary",
      img: "/coreteam/ghanshyam.jpeg", // Updated path
      github: "https://github.com/GhanashyamKadam",
      linkedin: " https://www.linkedin.com/in/ghanashyamkadam/",
      twitter: "https://x.com/Ghanashyam3f4",
    },
    {
      name: "Sourav Thakur",
      title: "Designer",
      img: "/coreteam/sourav.jpg", // Updated path
      github: "https://github.com/souravthakur",
      linkedin: "https://www.linkedin.com/in/souravthakur/",
      twitter: "https://twitter.com/souravthakur",
    },
    {
      name: "Aniket jawalegekar",
      title: "Content Creator",
      img: "/coreteam/aniket.jpeg", // Updated path
      github: "https://github.com/aniketjawalegekar",
      linkedin: "https://www.linkedin.com/in/aniketjawalegekar/",
      twitter: "https://twitter.com/aniketjawalegekar",
    },
    {
      name: "Abhishek Katale",
      title: "Data Science Lead",
      img: "/coreteam/abhishekKatale.jpeg", // Updated path
      github: "https://github.com/Abhishekkatale",
      linkedin: " https://www.linkedin.com/in/abhishek-katale/",
      twitter: "https://x.com/AbhishekKatale2",
    },
    {
      name: "Sakshi Jadhav",
      title: "Membership Admin",
      img: "/coreteam/sakshi.jpeg", // Updated path
      github: "https://github.com/sakshijadhav",
      linkedin: "https://www.linkedin.com/in/sakshijadhav/",
      twitter: "https://twitter.com/sakshijadhav",
    },
    {
      name: "Arnav Kulkarni",
      title: "Event Coordinator",
      img: "/coreteam/arnav.jpeg", // Updated path
      github: "https://github.com/arnavkulkarni",
      linkedin: "https://www.linkedin.com/in/arnavkulkarni/",
      twitter: "https://twitter.com/arnavkulkarni",
    },
    {
      name: "Abhishek Kaware",
      title: " Co-Event Coordinator",
      img: "/coreteam/abhishekKaware.jpeg", // Updated path
      github: "https://github.com/abhishekkaware",
      linkedin: "https://www.linkedin.com/in/abhishekkaware/",
      twitter: "https://twitter.com/abhishekkaware",
    },
    {
      name: "Prathmesh Pichkate",
      title: "Archivist",
      img: "/coreteam/prathmesh.jpeg",
      github: "http://github.com/prathamesh-pichkate",
      linkedin: " https://www.linkedin.com/in/prathamesh-pichkate1208",
      twitter: "https://x.com/Prathamesh_p128?t=2OVG1xZ_HdXLUCCKr6daig&s=09",
    },
  ];

  return (
    <motion.div
      className="flex flex-col items-center px-4 py-20 bg-gradient-to-b from-black to-green-900/30"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="mb-12 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
        Meet Our Core Team
      </h2>

      <div className="grid grid-cols-1 gap-8 w-full max-w-6xl md:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center p-6 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 bg-black/30 hover:shadow-green-500/20 hover:bg-green-900/20"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="overflow-hidden mb-4 w-32 h-32 rounded-full">
              <Image
                src={member.img}
                alt={member.name}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-green-400">{member.name}</h3>
            <p className="mb-4 text-gray-400">{member.title}</p>
            <div className="flex space-x-4">
              <a
                href={member.github}
                className="text-gray-400 transition-colors hover:text-green-400"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={member.linkedin}
                className="text-gray-400 transition-colors hover:text-green-400"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={member.twitter}
                className="text-gray-400 transition-colors hover:text-green-400"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CoreTeam;
