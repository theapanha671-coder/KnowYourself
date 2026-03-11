const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true },
    titleKm: { type: String, default: "" },
    description: { type: String, default: "" },
    descriptionKm: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    skills: { type: [String], default: [] },
    skillsKm: { type: [String], default: [] },
    roadmap: {
      type: [
        {
          step: { type: String, required: true },
          stepKm: { type: String, default: "" },
          details: { type: String, default: "" },
          detailsKm: { type: String, default: "" }
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Career", careerSchema);


