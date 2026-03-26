const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    avatarUrl: { type: String, default: "" },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "student", enum: ["student", "employee", "admin"] },
    permissions: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);


