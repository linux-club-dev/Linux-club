"use client";
import { motion } from "framer-motion";
import Slider from "react-slick";

const AboutUs = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="relative text-white bg-gradient-to-r from-gray-900 via-purple-800 to-black">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-grid"></div>

      <div className="container flex relative z-10 flex-col gap-8 items-center px-4 py-12 mx-auto md:gap-16 lg:flex-row md:px-8 lg:px-16 md:py-20">
        {/* Image Carousel Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex justify-center mb-8 w-full lg:w-1/2 lg:justify-start lg:mb-0"
        >
          <div className="relative w-full lg:w-[60vh] lg:h-[50vh] rounded-md overflow-hidden shadow-lg">
            <Slider {...settings}>
              <div>
                <motion.img
                  src="home1.jpeg"
                  alt="About Image 1"
                  className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                />
              </div>
              <div>
                <motion.img
                  src="home1.jpeg"
                  alt="About Image 2"
                  className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                />
              </div>
              <div>
                <motion.img
                  src="home1.jpeg"
                  alt="About Image 3"
                  className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                />
              </div>
              <div>
                <motion.img
                  src="home1.jpeg"
                  alt="About Image 4"
                  className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                />
              </div>
            </Slider>
            <div className="absolute inset-0 rounded-md border-2 border-purple-500"></div>
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full text-center lg:w-1/2 lg:text-left"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl md:mb-6 text-white-800"
          >
            About
          </motion.h1>
          <motion.h3
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-3 font-semibold tracking-wide text-purple-500 uppercase text-md md:text-lg md:mb-4"
          >
            Discover Linux Club
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-6 text-sm leading-relaxed md:text-base lg:text-lg md:mb-8"
          >
            At the Linux Club of PDEA College Of Engineering, we pride ourselves
            on being a vibrant community of students who are deeply passionate
            about Linux and open-source technology. Our club offers a dynamic
            platform where members can learn, explore, and actively contribute
            to the world of Linux. Through our collective efforts, we aim to
            support each others&apos; growth and drive advancements in the
            open-source community.
          </motion.p>

          <motion.a
            href="#"
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)",
            }}
            className="inline-block px-4 py-2 bg-transparent rounded-md border border-purple-400 transition-colors duration-300 text-white-400 md:px-6 md:py-3 hover:bg-purple-400 hover:text-gray-900"
          >
            Read More
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
