import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Setup dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Define the schema directly in this script to avoid import issues
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// MongoDB connection
const dbconnect = async () => {
  try {
    const MONGODB_URI =
      process.env.MONGODB_URI ||
      "mongodb+srv://admin:Veddev5204@cluster0.zohjdlx.mongodb.net/Linclub";

    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const blogsssgooobrrrrrr = async () => {
  let connection;
  try {
    connection = await dbconnect();
    console.log("DB connected successfully");

    // Create the Blog model
    const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

    // Define mock blog data
    const blogs = [
      {
        title: "Getting Started with Linux: A Beginner's Guide",
        link: "https://medium.com/linuxclub/getting-started-with-linux-beginners-guide",
        createdAt: new Date("2024-12-01"),
        updatedAt: new Date("2024-12-01"),
      },
      {
        title: "10 Essential Linux Commands Every User Should Know",
        link: "https://medium.com/linuxclub/10-essential-linux-commands",
        createdAt: new Date("2024-12-05"),
        updatedAt: new Date("2024-12-07"),
      },
      {
        title: "Setting Up a Perfect Development Environment on Linux",
        link: "https://medium.com/linuxclub/perfect-development-environment-linux",
        createdAt: new Date("2024-12-10"),
        updatedAt: new Date("2024-12-15"),
      },
      {
        title: "Understanding the Linux File System Hierarchy",
        link: "https://medium.com/linuxclub/linux-file-system-hierarchy",
        createdAt: new Date("2024-12-20"),
        updatedAt: new Date("2024-12-22"),
      },
      {
        title: "Linux Security Best Practices for Beginners",
        link: "https://medium.com/linuxclub/linux-security-best-practices",
        createdAt: new Date("2025-01-05"),
        updatedAt: new Date("2025-01-10"),
      },
      {
        title: "Creating Your First Bash Script: Step by Step Guide",
        link: "https://medium.com/linuxclub/first-bash-script-guide",
        createdAt: new Date("2025-01-15"),
        updatedAt: new Date("2025-01-16"),
      },
      {
        title: "Introduction to Docker on Linux",
        link: "https://medium.com/linuxclub/intro-to-docker-linux",
        createdAt: new Date("2025-01-20"),
        updatedAt: new Date("2025-01-25"),
      },
      {
        title: "How to Contribute to Open Source Projects",
        link: "https://medium.com/linuxclub/contribute-to-open-source",
        createdAt: new Date("2025-02-01"),
        updatedAt: new Date("2025-02-05"),
      },
      {
        title: "Linux Networking Fundamentals",
        link: "https://medium.com/linuxclub/linux-networking-fundamentals",
        createdAt: new Date("2025-02-10"),
        updatedAt: new Date("2025-02-12"),
      },
      {
        title: "Package Management in Different Linux Distributions",
        link: "https://medium.com/linuxclub/linux-package-management",
        createdAt: new Date("2025-02-20"),
        updatedAt: new Date("2025-02-25"),
      },
      {
        title: "Setting Up a LAMP Stack on Linux",
        link: "https://medium.com/linuxclub/lamp-stack-setup-linux",
        createdAt: new Date("2025-03-01"),
        updatedAt: new Date("2025-03-05"),
      },
      {
        title: "Vim vs Emacs: The Ultimate Editor Showdown",
        link: "https://medium.com/linuxclub/vim-vs-emacs-showdown",
        createdAt: new Date("2025-03-10"),
        updatedAt: new Date("2025-03-15"),
      },
    ];

    // Clear existing blogs
    const deleteResult = await Blog.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing blogs`);

    // Insert new blogs
    const result = await Blog.insertMany(blogs);
    console.log(`Added ${result.length} blogs successfully`);

    // Print the inserted blogs
    console.log("Blogs added:");
    result.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title}`);
    });
  } catch (error) {
    console.error("Error seeding blogs:", error);
  } finally {
    if (connection) {
      await connection.close();
      console.log("Database connection closed");
    }
  }
};

// Execute the function
blogsssgooobrrrrrr()
  .then(() => {
    console.log("Blog seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Blog seeding failed:", error);
    process.exit(1);
  });
