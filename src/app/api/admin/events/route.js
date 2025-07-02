import { NextResponse } from "next/server";
import dbconnect from "@/lib/dbconnect";
import Event from "@/db/models/adminschema";

export async function GET() {
  await dbconnect();
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ events }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  await dbconnect();
  try {
    const data = await request.json();
    const newEvent = await Event.create(data);
    return NextResponse.json(
      { event: newEvent, message: "Event created successfully" },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  await dbconnect();
  try {
    const data = await request.json();
    const { _id, ...updateData } = data;

    const updatedEvent = await Event.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { event: updatedEvent, message: "Event updated successfully" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  await dbconnect();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 }
      );
    }

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
