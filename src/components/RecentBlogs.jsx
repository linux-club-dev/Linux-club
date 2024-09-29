"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const RecentBlogs = () => {
  // Hardcoded blog posts
  const blogPosts = [
    {
      title:
        "In war-torn Sudan, a displaced startup incubator returns to fuel innovation",
      author: "Annie Njanja",
      date: "2024-09-28",
      content: `Businesses need stability to thrive. Unfortunately for anyone in Sudan, stability has been hard to come by for the past year and a half as the country quakes amidst
         a raging civil war. More than 20,000 people have been killed, and about 7.7 million people have been displaced just within the country; millions have had to flee across international
          borders as refugees.`,
      categories: ["War", "Startup"],
      link: "https://techcrunch.com/2024/09/29/savannah-returns-to-fuel-innovation/",
      desc: "https://techcrunch.com/wp-content/uploads/2024/09/Sudan1-e1727456554701.jpeg",
    },
    {
      title: "AI dominated both YC Demo Day and startup news",
      author: "Marina Temkin",
      date: "2024-09-25",
      content:
        "This week was a busy one for the startup and VC world, with its fair share of funding news and, of course, the latest edition of YC’s Demo Day.",
      categories: ["5G", "Telecom"],
      link: "https://techcrunch.com/2024/09/27/ai-dominated-both-yc-demo-day-and-startup-news/",
      desc: "https://techcrunch.com/wp-content/uploads/2015/12/shutterstock_228897490.png?resize=2048,1152",
    },
    {
      title:
        "VCs expect a surge in startups offering lower rate mortgages, other loans now that the Feds cut rates",
      author: " ",
      date: "2024-09-20",
      content:
        "When the U.S. Feds cut interest rates by half a percentage point last week, it was a dash of good news for venture capitalists backing one particularly beleaguered class of startups: fintechs, especially those that rely on loans for cash flow to operate their businesses.",
      categories: ["VC's", "Startup"],
      link: "https://techcrunch.com/2024/09/28/vcs-expect-a-surge-in-startups-offering-lower-rate-mortgages-other-loans-now-that-the-fed-cut-rates/",
      desc: "https://techcrunch.com/wp-content/uploads/2024/09/gettyimages-1572935845-170667a.jpg",
    },
    {
      title: "Blockchain Beyond Cryptocurrency",
      author: "Michael Lee",
      date: "2024-09-15",
      content:
        "YouTube blocks videos from Adele, Green Day, Bob Dylan, others in dispute with SESAC.",
      categories: ["Content-Policy", "Media"],
      link: "https://techcrunch.com/2024/09/29/youtube-blocks-videos-from-adele-green-day-bob-dylan-others-in-dispute-with-sesac/",
      desc: "https://techcrunch.com/wp-content/uploads/2024/09/GettyImages-2164303808.jpg",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative px-4 py-20 overflow-hidden bg-gradient-to-b from-green-900/30 to-black/50"
    >
      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-5"></div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 md:text-5xl"
        >
          Latest Tech Insights
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
              className="overflow-hidden transition-all duration-300 rounded-lg backdrop-blur-sm bg-black/30 hover:shadow-lg hover:shadow-green-500/20"
            >
              <div className="relative h-48">
                <Image
                  src={post.desc}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.categories.slice(0, 2).map((category, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-semibold text-green-400 rounded-full bg-green-900/30"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h3 className="mt-2 mb-1 text-lg font-semibold text-gray-100 line-clamp-2">
                  {post.title}
                </h3>
                <p className="mb-2 text-sm text-gray-400">
                  {new Date(post.date).toLocaleDateString()} | By {post.author}
                </p>
                <div
                  className="mb-4 text-sm text-gray-300 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <Link
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-400 transition-colors hover:text-green-300"
                >
                  <motion.span
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default RecentBlogs;
