import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TeamPage() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/team");
        if (response.data && Array.isArray(response.data["Team Members"])) {
          setTeamData(response.data["Team Members"]);
        } else {
          console.error("Unexpected data structure:", response.data);
          throw new Error("Invalid data structure received from API");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
        setTeamData([
          { name: "Vrushali Kudante", title: "President", img: "vrushali.jpg" },
          {
            name: "Pratik Mhalle",
            title: "Vice president",
            img: "pratik.jpeg",
          },
          {
            name: "Arnav Kulkarni",
            title: "Event Manager",
            img: "arnav.jpg",
          },
          {
            name: "Abhishek Katale",
            title: "Data Scientist",
            img: "abhishekKatale.jpeg",
          },
          {
            name: "Sairaj Javalikar",
            title: "Cyber Security Lead",
            img: "sairaj.jpeg",
          },
          {
            name: "Abhishek kaware",
            Title: "IDK",
            img: "abhishekKaware.jpeg",
          },
          {
            name: "Ghanashyam",
            title: "IDK",
            img: "ghanashyam.jpeg",
          },
          {
            name: "Sakshi",
            title: "IDK",
            img: "sakshi.jpeg",
          },
          {
            name: "Aniket",
            title: "IDK",
            img: "aniket.jpeg",
          },
          {
            name: "Prathmesh Pichkate",
            title: "IDK",
            img: "prathmesh.jpeg",
          },
          {
            name: "Sourov ",
            title: "Design Lead",
            img: "sourov.jpeg",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  // Loading animation
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative w-16 h-16">
          <div className="absolute w-full h-full border-4 rounded-full border-cyan-600/20"></div>
          <div className="absolute w-full h-full border-t-4 rounded-full border-cyan-500 animate-spin"></div>
        </div>
        <p className="mt-4 text-sm text-cyan-400">Loading team...</p>
      </div>
    );
  }

  // Error state with retry button
  if (error) {
    return (
      <div className="max-w-md px-8 py-12 mx-auto text-center">
        <div className="p-6 border rounded-xl bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-700/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 mx-auto mb-4 text-red-500/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="mb-4 text-gray-400">Unable to load team data.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm border rounded-md text-cyan-300 border-cyan-800 hover:bg-cyan-900/30"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!teamData || teamData.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-400">No team members found</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-16 mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-4xl font-bold text-center"
      >
        <span className="text-transparent bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text">
          Meet our Team
        </span>
      </motion.h2>

      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teamData.map((member, index) => (
          <motion.div
            key={member._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group perspective-1000"
            whileHover={{ scale: 1.03 }}
          >
            {/* ID Card */}
            <div className="relative w-full h-[380px] rounded-xl preserve-3d transition-transform duration-500 group-hover:rotate-y-10">
              {/* Card Front */}
              <div className="absolute inset-0 flex flex-col overflow-hidden border-2 backface-hidden rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-cyan-500/30">
                {/* Card Header with Club Logo */}
                <div className="relative p-4 mb-4 text-center bg-gradient-to-r from-cyan-900 to-blue-900">
                  <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-grid-pattern"></div>
                  <h3 className="text-lg font-bold text-white">Linux Club</h3>
                  <p className="text-xs text-cyan-300">Team Member ID</p>
                </div>

                {/* Photo Area */}
                <div className="flex flex-col items-center flex-grow px-6 pb-4">
                  {/* Photo Border */}
                  <div className="p-1 mb-4 rounded-full w-36 h-36 bg-gradient-to-r from-cyan-500 to-blue-500">
                    <div className="relative w-full h-full p-2 m-1 overflow-hidden rounded-full">
                      <Image
                        src={`/coreteam/${member.img}`}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                  </div>

                  {/* Member Details */}
                  <h3 className="mb-1 text-xl font-bold text-white">
                    {member.name}
                  </h3>
                  <div className="px-3 py-1 mb-4 border rounded-full bg-cyan-900/50 border-cyan-500/20">
                    <p className="text-sm text-cyan-300">{member.title}</p>
                  </div>

                  {/* ID Details */}
                  <div className="w-full p-2 m-2 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">ID:</span>
                      <span className="font-mono text-white">
                        {member._id
                          ? member._id.slice(0, 8)
                          : `LC-${(index + 1).toString().padStart(4, "0")}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Joined:</span>
                      <span className="font-mono text-white">
                        2023-{Math.floor(Math.random() * 12) + 1}-
                        {Math.floor(Math.random() * 28) + 1}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Access Level:</span>
                      <span className="font-mono text-white">
                        {member.title.includes("President")
                          ? "A+"
                          : member.title.includes("Lead")
                          ? "A"
                          : "B"}
                      </span>
                    </div>
                  </div>

                  {/* Barcode */}
                  <div className="w-full pt-4 mt-4 border-t border-gray-700/50">
                    <div className="h-8 bg-[url('/barcode.png')] bg-contain bg-no-repeat bg-center"></div>
                    <p className="mt-1 font-mono text-xs text-center text-gray-500">
                      {Math.random()
                        .toString(36)
                        .substring(2, 10)
                        .toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Edge */}
              <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-cyan-400 via-cyan-600 to-cyan-400"></div>
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-cyan-400 via-cyan-600 to-cyan-400"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-400"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-400"></div>
            </div>

            {/* Social links below card */}
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="#"
                className="p-2 transition-colors rounded-full bg-cyan-900/30 text-cyan-400 hover:bg-cyan-800/50"
              >
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="p-2 transition-colors rounded-full bg-cyan-900/30 text-cyan-400 hover:bg-cyan-800/50"
              >
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"></path>
                </svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
