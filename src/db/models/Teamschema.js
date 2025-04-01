import mongoose from "mongoose";
const Schema = mongoose.Schema;

const teamMemberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    default: "https://github.com/",
  },
  linkedin: {
    type: String,
    default: "https://linkedin.com/in/",
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
});

// Handle models in ES modules properly
const TeamMember =
  mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);
export default TeamMember;
