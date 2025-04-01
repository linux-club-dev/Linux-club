import { NextResponse } from "next/server";
import dbconnect from "@/lib/dbconnect";
import teamMember from "@/db/models/Teamschema";
export async function GET() {
  try {
    await dbconnect();
    const teamMembers = await teamMember.find();

    return NextResponse.json(
      {
        "Team Members": teamMembers,
        message: "Team Members fetched successfully",
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Database error:", e);

    // Return mock data when database is unavailable
    return NextResponse.json(
      {
        "Team Members": [
          {
            name: "John Doe",
            title: "President",
            img: "default.png",
          },
          {
            name: "Jane Smith",
            title: "Technical Lead",
            img: "default.png",
          },
          {
            name: "Alex Johnson",
            title: "Community Manager",
            img: "default.png",
          },
        ],
        message: "Using fallback data due to database connection issue",
      },
      { status: 200 }
    );
  }
}

// Post request to add a new team member
export async function POST(request) {
  await dbconnect();
  try {
    const data = await request.json();
    const newTeamMember = await teamMember.create({
      name: data.name,
      title: data.title,
      img: data.img,
    });
    return NextResponse.json(
      {
        "New Team Member": newTeamMember,
        message: "New Team Member added successfully",
      },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
