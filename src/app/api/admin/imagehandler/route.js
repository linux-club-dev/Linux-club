import { NextResponse } from "next/server";
import dbconnect from "@/lib/dbconnect";
import Image from "@/db/models/ImageSchema";
export async function GET() {
  await dbconnect();
  try {
    const images = await Image.find();
    return NextResponse.json({ images }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
export async function POST(req) {
  await dbconnect();
  try {
    const data = await req.json();
    if (!data.title || !data.imageUrl) {
      return NextResponse.json(
        { message: "Title and Image URL are required" },
        { status: 400 }
      );
    }

    const image = new Image({
      title: data.title,
      imageUrl: data.imageUrl,
      description: data.description || "",
      category: data.category || "gallery",
      message: data.message || "",
    });
    await image.save();

    return NextResponse.json(
      {
        image,
        message: "Message is the jassi bhai I olee belive in Jassi bhai ",
      },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
