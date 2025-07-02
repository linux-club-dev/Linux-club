import { NextResponse } from "next/server";
import dbconnect from "@/lib/dbconnect";
import Blog from "@/db/models/blogschema";

export async function GET() {
  await dbconnect();
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
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
      { blog: newBlog, message: "Blog created successfully" },
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
    updateData.updatedAt = new Date();

    const updatedBlog = await Blog.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { blog: updatedBlog, message: "Blog updated successfully" },
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
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
