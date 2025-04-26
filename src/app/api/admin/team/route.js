import { NextResponse } from "next/server";
import dbconnect from "@/lib/dbconnect";
import TeamMember from "@/db/models/Teamschema";

export async function GET() {
  try {
    await dbconnect();
    const teamMembers = await TeamMember.find();

    return NextResponse.json(
      {
        "Team Members": teamMembers,
        message: "Team members fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch team members",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbconnect();
    const data = await request.json();

    const newMember = await TeamMember.create(data);

    return NextResponse.json(
      {
        member: newMember,
        message: "Team member added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      {
        error: "Failed to add team member",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
