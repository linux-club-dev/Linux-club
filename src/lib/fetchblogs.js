import dbconnect from "./dbconnect";

const fetchBlogs = async () => {
  try {
    await dbconnect(); // Ensure the database connection is established
    setLoading(true);
    const response = await axios.get("/api/admin/blogs");

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

      setBlogs(transformedBlogs);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (err) {
    console.error("Error fetching blogs:", err);
    setError("Failed to load blogs. Please try again later.");

    // Fallback to mock data if the API fails
    setBlogs([
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
      // Add more fallback items as needed
    ]);
  } finally {
    setLoading(false);
  }
};
export default fetchBlogs;
