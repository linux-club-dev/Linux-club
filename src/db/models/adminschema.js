// MongoDB schemea for events at club
import mongoose from "mongoose";
let Schema = mongoose.Schema;

let adminSchema = new Schema({
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
});
// global chaching for the model
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default Admin;
