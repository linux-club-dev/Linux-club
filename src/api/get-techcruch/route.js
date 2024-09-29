import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

export async function GET() {
  try {
    const feed = await parser.parseURL("https://techcrunch.com/feed/");
    const posts = feed.items.slice(0, 4).map((item) => ({
      title: item.title,
      date: item.pubDate,
      link: item.link,
      author: item.creator,
      content: item.content,
      categories: item.categories,
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching TechCrunch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch TechCrunch posts" },
      { status: 500 }
    );
  }
}
