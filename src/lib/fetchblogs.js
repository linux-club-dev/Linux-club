// This file is deprecated - blog fetching is now handled directly in components
// using useEffect and axios calls to /api/admin/blogs

import axios from "axios";

const fetchBlogs = async () => {
  try {
    // Use full URL for server-side contexts or ensure this is only called client-side
    const baseURL =
      typeof window !== "undefined"
        ? ""
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await axios.get(`${baseURL}/api/admin/blogs`);

    if (response.data && response.data.blogs) {
      // Transform the blog data to match our UI requirements
      const transformedBlogs = response.data.blogs.map((blog) => ({
        id: blog._id,
        title: blog.title,
        brief: `Check out this article on ${blog.title.toLowerCase()}.`,
        slug: blog.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
        dateAdded: new Date(blog.createdAt).toISOString().split("T")[0],
        coverImage: "/placeholder.svg?height=200&width=400",
        readTime: `${Math.max(3, Math.floor(blog.title.length / 5))} min read`,
        link: blog.link,
      }));

      return { success: true, data: transformedBlogs };
    } else {
      throw new Error("Invalid response format");
    }
  } catch (err) {
    console.error("Error fetching blogs:", err);

    // Return fallback data if the API fails
    return {
      success: false,
      error: "Failed to load blogs. Please try again later.",
      data: [
        {
          id: "fallback-1",
          title: "Getting Started with Linux: A Beginner's Guide",
          brief:
            "Learn the basics of Linux and start your journey into open-source.",
          slug: "getting-started-with-linux",
          dateAdded: "2023-09-15",
          coverImage: "/placeholder.svg?height=200&width=400",
          readTime: "5 min read",
          link: "https://medium.com/linuxclub/getting-started-with-linux-beginners-guide",
        },
      ],
    };
  }
};

export default fetchBlogs;
