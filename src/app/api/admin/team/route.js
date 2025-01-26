import { NextResponse } from "next/server";
import dbconnect from "@/lib/dbconnect";
import teamMember from "@/db/models/Teamschema";
export async function GET() {
  await dbconnect();
  try {
    const teamMembers = await teamMember.find();
    return NextResponse.json(
      {
        "Team Members": teamMembers,
        message: "Team Members fetched successfully",
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
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
