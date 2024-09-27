import { motion } from "framer-motion";
import { LaptopMinimal } from "lucide-react";

const activities = [
  {
    title: "Workshops",
    description:
      "Regular workshops on topics like system administration, scripting, and security.",
    icon: <LaptopMinimal size={48} color="green" />,
  },
  {
    title: "Open Source",
    description:
      "Engage in open-source projects and learn from real-world coding experiences.",
    icon: <LaptopMinimal size={48} color="green" />,
  },
  {
    title: "Hackathons",
    description:
      "Participate in coding competitions to solve problems and innovate.",
    icon: <LaptopMinimal size={48} color="green" />,
  },
  {
    title: "Guest Lectures",
    description:
      "Attend lectures by industry professionals on various Linux and tech topics.",
    icon: <LaptopMinimal size={48} color="green" />,
  },
  {
    title: "Project Development",
    description:
      "Work on projects that solve real-world problems using Linux and open-source tools.",
    icon: <LaptopMinimal size={48} color="green" />,
  },
  {
    title: "Community Meetups",
    description:
      "Join meetups to discuss the latest in Linux, share knowledge, and network.",
    icon: <LaptopMinimal size={48} color="green" />,
  },
];

const cardVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
    transition: {
      duration: 0.3,
    },
  },
};

const OurActivities = () => {
  return (
    <div className="container px-8 mx-auto my-12 md:px-16 lg:px-24">
      <h2 className="mb-12 text-4xl font-bold text-center text-white">
        Our Activities
      </h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="flex flex-col gap-4 justify-center items-center p-6 text-center bg-gradient-to-r from-gray-900 via-purple-800 to-black rounded-lg shadow-lg transition-all duration-300 transform"
            >
              <motion.div className="text-green-500">
                {activity.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">
                {activity.title}
              </h3>
              <p className="text-base text-gray-300 md:text-lg lg:text-xl">
                {activity.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurActivities;
