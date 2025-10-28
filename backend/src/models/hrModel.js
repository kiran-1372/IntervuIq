// src/models/hrModel.js
import mongoose from "mongoose";

const HRSchema = new mongoose.Schema({
  interview: { type: mongoose.Schema.Types.ObjectId, ref: "Interview", required: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, match: [/\S+@\S+\.\S+/, "Invalid email"] },
  phone: { type: String, trim: true },
  role: { type: String, trim: true }, // optional: recruiter role/title
}, { timestamps: true });

const HR = mongoose.model("HR", HRSchema);
export default HR;
