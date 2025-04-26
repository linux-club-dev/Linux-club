import mongoose from "mongoose";
const schema = mongoose.Schema;
const blogSchema = new schema({
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
// ES module is a mutherfuckerrrrrr
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
