import mongoose from "mongoose";
// Team Schema
const teammemberSchema = new mongoose.Schema({
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
});
// Model defination
const teamMember =
  mongoose.models.TeamMember || mongoose.model("TeamMember", teammemberSchema);
export default teamMember;
