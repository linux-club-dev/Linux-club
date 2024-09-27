import { motion } from "framer-motion";

// Service Card Component with animation
function ServiceCard({ icon, title, description, gradient }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col justify-center items-center p-6 w-72 h-72 rounded-lg shadow-lg transition-all duration-300 transform ${gradient} hover:shadow-2xl`}
    >
      <motion.div
        className="flex justify-center items-center mb-4 w-16 h-16 bg-white rounded-full"
        whileHover={{ rotate: 360, transition: { duration: 1 } }}
      >
        {icon}
      </motion.div>
      <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
      <p className="text-base text-center text-gray-200">{description}</p>
    </motion.div>
  );
}

function OurMission() {
  const services = [
    {
      icon: (
        <svg
          className="w-6 h-6 text-teal-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37z"
          />
        </svg>
      ),
      title: "Strategy",
      description:
        "Planning with precision to make your journey smooth and successful.",
      gradient: "bg-gradient-to-br from-green-400 via-blue-500 to-indigo-600",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-teal-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      title: "Explore",
      description: "Discover new paths where innovation meets excellence.",
      gradient: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-teal-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      ),
      title: "Direction",
      description:
        "Guiding you towards the best outcomes with strategic direction.",
      gradient: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-teal-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 10V14m6 4v-4m-6 4v-4m6 4v-4"
          />
        </svg>
      ),
      title: "Expertise",
      description:
        "Our expertise ensures your goals are not just met but exceeded.",
      gradient: "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="container py-12 mx-auto"
    >
      <h2 className="mb-12 text-4xl font-bold text-center text-white">
        Our Mission
      </h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default OurMission;
