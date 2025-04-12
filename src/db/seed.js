const { default: dbconnect } = require("@/lib/dbconnect");

dbconnect()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));
const mongoose = require("mongoose");
const TeamMember = require("@/models/TeamMember");
const teamMembers = [
  { name: "Vrushali Kudante", title: "President", img: "vrushali.jpg" },
  { name: "Pratik Mhalle", title: "Vice president", img: "pratik.jpeg" },
  { name: "Arnav Kulkarni", title: "Event Manager", img: "arnav.jpg" },
  {
    name: "Abhishek Katale",
    title: "Data Scientist",
    img: "abhishekKatale.jpeg",
  },
  {
    name: "Sairaj Javalikar",
    title: "Cyber Security Lead",
    img: "sairaj.jpeg",
  },
  {
    name: "Abhishek Kaware",
    title: "Backend Developer",
    img: "abhishekKaware.jpeg",
  },
  { name: "Ghanashyam", title: "Frontend Developer", img: "ghanashyam.jpeg" },
  { name: "Sakshi", title: "UI/UX Designer", img: "sakshi.jpeg" },
  { name: "Aniket", title: "DevOps Engineer", img: "aniket.jpeg" },
  {
    name: "Prathmesh Pichkate",
    title: "Full Stack Developer",
    img: "prathmesh.jpeg",
  },
  { name: "Sourov", title: "Design Lead", img: "sourov.jpeg" },
];

// Events data
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
    EventTime: "10:00 AM",
    EventVenue: "PDEA College of Engineering, Auditorium",
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

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await TeamMember.deleteMany({});
    console.log("Cleared existing team members");

    await Event.deleteMany({});
    console.log("Cleared existing events");

    // Seed team members
    const createdMembers = await TeamMember.insertMany(teamMembers);
    console.log(`${createdMembers.length} team members seeded successfully`);

    // Seed events
    const createdEvents = await Event.insertMany(events);
    console.log(`${createdEvents.length} events seeded successfully`);

    // Log success and exit
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();
