const mongoose = require("mongoose");
import Image from "@/db/models/ImageSchema";
const dbconnect = require("@/lib/dbconnect"); // Adjust the path as needed

const NUM_IMAGES = 10;

// Function to generate mock image data
function generateMockImages() {
  return Array.from({ length: NUM_IMAGES }, (_, i) => ({
    title: `Gallery Image ${i + 1}`,
    imageUrl: `https://picsum.photos/800/600?random=${i + 1}`, // Random image from picsum.photos
    description: `Random gallery image ${i + 1}`,
    uploadDate: new Date(),
    category: "gallery",
  }));
}

// Seed images into the database
async function seedImages() {
  try {
    // Connect to the database
    await dbconnect();

    // Clear existing images
    await Image.deleteMany({});

    // Generate mock image data
    const imageData = generateMockImages();

    // Insert images into the database
    await Image.insertMany(imageData);

    console.log(`Successfully seeded ${NUM_IMAGES} images`);
  } catch (error) {
    console.error("Error seeding images:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

// Run the seeder
seedImages();
