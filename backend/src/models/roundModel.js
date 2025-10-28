// src/models/roundModel.js
import mongoose from "mongoose";

const RoundSchema = new mongoose.Schema({
  interview: { type: mongoose.Schema.Types.ObjectId, ref: "Interview", required: true },
  roundNumber: { type: Number, required: true },
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ["coding", "system-design", "behavioral", "cultural", "technical"], required: true },
  status: { type: String, enum: ["completed", "scheduled", "pending"], default: "pending" },
  date: String,
  duration: String,
  interviewer: String,
  personalExperience: String,
  feedback: String,
  confidence: { type: Number, min: 0, max: 100 },
}, { timestamps: true });

// remove linked Questions when a round is deleted
RoundSchema.pre("findOneAndDelete", async function(next) {
  try {
    const id = this.getQuery()['_id'];
    if (!id) return next();
    await mongoose.model("Question").deleteMany({ round: id });
    next();
  } catch (err) {
    next(err);
  }
});

const Round = mongoose.model("Round", RoundSchema);
export default Round;
