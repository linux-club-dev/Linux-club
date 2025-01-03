import mongoose from "mongoose";
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  title: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    enum: ["event", "gallery", "other"],
    default: "gallery",
  },
});

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);
export default Image;
