import { NextResponse } from "next/server";
import dbconnect from "@/lib/dbconnect";
import TeamMember from "@/db/models/Teamschema";

export async function GET() {
  try {
    await dbconnect();
    const teamMembers = await TeamMember.find().sort({ joinDate: -1 });

    return NextResponse.json(
      {
        teamMembers: teamMembers,
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

export async function PUT(request) {
  try {
    await dbconnect();
    const data = await request.json();
    const { _id, ...updateData } = data;

    const updatedMember = await TeamMember.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedMember) {
      return NextResponse.json(
        { message: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        member: updatedMember,
        message: "Team member updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      {
        error: "Failed to update team member",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbconnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Team member ID is required" },
        { status: 400 }
      );
    }

    const deletedMember = await TeamMember.findByIdAndDelete(id);

    if (!deletedMember) {
      return NextResponse.json(
        { message: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Team member deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete team member",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
