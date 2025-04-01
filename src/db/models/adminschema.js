import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
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

// Handle models in ES modules properly
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;
