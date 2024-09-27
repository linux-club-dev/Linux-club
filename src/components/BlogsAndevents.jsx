import { motion } from "framer-motion";
import Image from "next/image";
const BlogsAndEvents = () => {
  return (
    <div className="container px-4 py-16 mx-auto md:px-8 lg:px-16">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Recent from Blog */}
        <div className="w-full md:w-1/2">
          <h2 className="mb-6 text-3xl font-bold text-white">
            Recent from Blog
          </h2>
          <div className="flex flex-col gap-6">
            {[1, 2].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg shadow-lg md:flex-row"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Image
                  src="/home3.png"
                  alt="Blog Image"
                  width={100}
                  height={100}
                  className="object-cover w-full h-24 rounded-lg md:w-32"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    Starting new session of body building this summer
                  </h3>
                  <p className="text-gray-400">
                    Posted by: Admin <span className="text-blue-400">210</span>
                  </p>
                  <p className="text-gray-400">
                    Far far away, behind the word mountains
                  </p>
                  <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded transition duration-300 hover:bg-blue-700">
                    Read More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="w-full md:w-1/2">
          <h2 className="mb-6 text-3xl font-bold text-white">
            Upcoming Events
          </h2>
          <div className="flex flex-col gap-6">
            {[
              { day: "14", month: "June" },
              { day: "13", month: "June" },
            ].map((event, index) => (
              <motion.div
                key={index}
                className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg shadow-lg md:flex-row"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <div className="flex flex-col justify-center items-center px-4 py-2 font-bold text-white bg-green-500 rounded-lg h-fit">
                  <p className="text-xl">{event.day}</p>
                  <p className="text-sm">{event.month}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    Starting new session of body building this summer
                  </h3>
                  <p className="text-gray-400">
                    Posted by: Admin <span className="text-blue-400">210</span>
                  </p>
                  <p className="text-gray-400">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia.
                  </p>
                  <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded transition duration-300 hover:bg-blue-700">
                    Read More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsAndEvents;
