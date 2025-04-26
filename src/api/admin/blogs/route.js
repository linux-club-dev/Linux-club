import { NextResponse } from "next/server";
import dbconnect from "@/lib/dbconnect";
import Blog from "@/db/models/blogschema";

export async function GET() {
  await dbconnect();
  try {
    const blogs = await Blog.find();
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  await dbconnect();
  try {
    const data = await request.json();
    const newBlog = await Blog.create(data);
    return NextResponse.json(
      { blog: newBlog, message: "Blog add hai baawe" },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
