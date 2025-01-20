import { Instagram } from "lucide-react"; // Assuming you're using lucide-react for Instagram icons
import Image from "next/image";

const CoreTeam = () => {
  // Team members data

  return (
    <div className="flex flex-col items-center px-4 py-10 my-6 bg-gradient-to-br">
      {/* Main title */}
      <h1 className="mb-12 text-4xl font-bold text-center text-white md:text-6xl">
        Meet Our Core Team
      </h1>

      {/* President & Vice President Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 lg:w-[80vh] max-w-6xl">
        {teamMembers.slice(0, 2).map((member, index) => (
          <div
            key={index}
            className="flex relative flex-col items-center p-6 text-white bg-transparent rounded-lg shadow-lg transition-transform transform hover:scale-105 shadow-cyan-500/50 hover:bg-slate-900 group"
          >
            {/* Image Section */}
            <div className="overflow-hidden w-24 h-24 rounded-full border md:w-48 md:h-48">
              <Image
                src={member.img}
                alt={member.name}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>

            {/* Content that is always visible */}
            <div className="flex flex-col items-center mt-6">
              <h3 className="text-xl italic font-bold md:text-2xl">
                {member.title}
              </h3>
              <h2 className="text-2xl font-semibold md:text-4xl">
                {member.name}
              </h2>
              <div className="flex justify-center mt-4 space-x-4">
                <a href="#" className="text-blue-500">
                  <Instagram className="w-4 h-4 md:h-6 md:w-6" />
                </a>
                <a href="#" className="text-blue-500">
                  <Instagram className="w-4 h-4 md:h-6 md:w-6" />
                </a>
                <a href="#" className="text-blue-500">
                  <Instagram className="w-4 h-4 md:h-6 md:w-6" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Other Team Members Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10 w-full lg:w-[75%]">
        {teamMembers.slice(2).map((member, index) => (
          <div
            key={index}
            className="flex relative flex-col items-center p-6 text-white bg-transparent rounded-lg shadow-lg transition-transform transform hover:scale-105 shadow-cyan-500/50 hover:bg-slate-700 group"
          >
            {/* Image Section */}
            <div className="overflow-hidden w-24 h-24 rounded-full border md:w-32 md:h-32">
              <Image
                src={member.img}
                alt={member.name}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>

            {/* Content that is always visible */}
            <div className="flex flex-col items-center mt-2 text-center md:mt-4">
              <h3 className="text-sm italic font-bold tracking-tight md:text-lg">
                {member.title}
              </h3>
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                {member.name}
              </h2>
              <div className="flex justify-center mt-4 space-x-4">
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  <Instagram className="w-4 h-4 md:h-6 md:w-6" />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  <Instagram className="w-4 h-4 md:h-6 md:w-6" />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  <Instagram className="w-4 h-4 md:h-6 md:w-6" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreTeam;
