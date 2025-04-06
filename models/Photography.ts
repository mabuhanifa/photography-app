import mongoose, { Schema } from "mongoose";

const PhotographySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    captureDate: { type: Date },
    location: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

const Photography =
  mongoose.models.Photography ||
  mongoose.model("Photography", PhotographySchema);

export default Photography;
