import mongoose from "mongoose";
const MGDBURI = process.env.MONGODB_URI;
if (!MGDBURI) {
  console.log("MongoDB URI not found");
  process.exit(1);
}
let storedconnection = global.mongoose;
if (!storedconnection) {
  storedconnection = global.mongoose = { connection: null, promise: null };
}
export default async function dbconnect() {
  if (storedconnection.connection) {
    return storedconnection.connection;
  }
  if (!storedconnection.promise) {
    const conn = await mongoose.connect(MGDBURI);
  }
  storedconnection.connection = await storedconnection.promise;
  return storedconnection.connection;
}
