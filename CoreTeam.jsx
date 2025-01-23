import { teamMembers } from "@/data/data";
import Image from "next/image";

export default function TeamPage() {
  return (
    <div className="container py-12 mx-auto">
      <h1 className="mb-12 text-4xl font-bold text-center">Our Team</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 transition-transform duration-300 transform bg-white rounded-lg shadow-md hover:scale-105 dark:bg-slate-800"
          >
            <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-lg">
              <Image
                src={`/coreteam/${member.img}`}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-center">{member.name}</h3>
            <p className="text-sm text-center text-gray-400">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}