import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Setup dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// MongoDB connection
import dbconnect from "@/lib/dbconnect";

// Define Event schema directly in this script
const eventSchema = new mongoose.Schema({
  EventName: {
    type: String,
    required: true,
  },
  EventDescription: {
    type: String,
    required: true,
  },
  EventDate: {
    type: String,
    required: true,
  },
  EventTime: {
    type: String,
    required: true,
  },
  EventVenue: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Event model
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

const floodembitch = async () => {
  let connection;
  try {
    connection = await dbconnect(); // Connect to the database

    const events = [
      {
        EventName: "Linux Installation Workshop",
        EventDescription:
          "Learn how to install and configure various Linux distributions on your machine. This hands-on workshop will cover Ubuntu, Fedora, and Arch Linux.",
        EventDate: "2025-02-15",
        EventTime: "10:00 AM",
        EventVenue: "Computer Lab 3, Engineering Building",
      },
      {
        EventName: "Open Source Contribution Day",
        EventDescription:
          "Join us for a full day of contributing to open source projects. We'll help you make your first pull request and understand how to become a regular contributor.",
        EventDate: "2025-03-01",
        EventTime: "9:00 AM",
        EventVenue: "Main Auditorium",
      },
      {
        EventName: "Code Nova: Developer Lecture Series",
        EventDescription:
          "An exciting lecture series focused on modern software development practices and coding techniques. This is part of our ongoing educational initiative.",
        EventDate: "2025-01-27",
        EventTime: "11:00 AM",
        EventVenue: "Room 101, Engineering Building",
      },
      {
        EventName: "Linux Security Essentials",
        EventDescription:
          "Learn about securing your Linux systems from common threats. Topics include firewall configuration, user permissions, encryption, and security best practices.",
        EventDate: "2025-04-10",
        EventTime: "2:00 PM",
        EventVenue: "Virtual Meeting (Zoom)",
      },
      {
        EventName: "Hackathon 2025",
        EventDescription:
          "Our annual 24-hour coding competition. Form teams and build innovative solutions to real-world problems using open-source technologies.",
        EventDate: "2025-05-20",
        EventTime: "9:00 AM",
        EventVenue: "Campus Innovation Hub",
      },
      {
        EventName: "Shell Scripting Masterclass",
        EventDescription:
          "From basics to advanced techniques, master the art of shell scripting to automate your daily tasks and improve productivity.",
        EventDate: "2025-03-06",
        EventTime: "2:00 PM",
        EventVenue: "Computer Science Department, Room 302",
      },
    ];

    // Clear existing events first
    const deleteResult = await Event.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing events`);

    // Insert new events
    const result = await Event.insertMany(events);
    console.log(`${result.length} events seeded successfully!`);
  } catch (error) {
    console.error("Error seeding events:", error);
  } finally {
    if (connection) {
      await connection.close();
      console.log("Database connection closed");
    }
  }
};

// Execute the function
floodembitch()
  .then(() => {
    console.log("Script completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });
