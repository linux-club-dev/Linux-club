import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

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
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="py-12 text-center text-red-500">Error: {error}</div>;
  }

  if (!teamData || teamData.length === 0) {
    return <div className="py-12 text-center">No team members found</div>;
  }

  return (
    <div className="container py-12 mx-auto">
      <h1 className="mb-12 text-4xl font-bold text-center">Our Team</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {teamData.map((member, index) => (
          <div
            key={member._id || index}
            className="flex flex-col items-center p-6 transition-transform duration-300 transform bg-white rounded-lg shadow-md hover:scale-105 dark:bg-slate-800"
          >
            <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-lg">
              <Image
                src={`/coreteam/${member.img}`}
                alt={member.name || "Team member"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-center text-primary">
              {member.name}
            </h3>
            <p className="text-sm text-center text-primary">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
