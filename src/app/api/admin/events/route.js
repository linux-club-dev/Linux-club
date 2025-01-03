import { NextResponse } from "next/server";
import dbconnect from "@/lib/dbconnect";
import Admin from "@/db/models/adminschema";
export async function GET() {
  await dbconnect();
  try {
    const events = await Admin.find();
    return NextResponse.json({ events }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
export async function POST(request) {
  await dbconnect();
  try {
    const data = await request.json();
    const newEvent = await Admin.create(data);
    return NextResponse.json(
      { event: newEvent, message: "Event add hai baawe" },
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
    const updatedEvent = await Admin.findByIdAndUpdate(data._id, data, {
      new: true,
    });
    return NextResponse.json(
      { event: updatedEvent, message: "Event updated hai baawe" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
