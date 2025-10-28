// src/models/interviewModel.js
import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["offer", "rejected", "pending", "interviewing"], default: "pending" },
  overallStatus: String,
  location: String,
  salary: String,
  overallFeedback: String,
  nextSteps: String,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

// compound unique index to prevent duplicates for (user, company, role, date)
InterviewSchema.index({ user: 1, company: 1, role: 1, date: 1 }, { unique: true });

// cascade delete associated Rounds, HRs, Questions
InterviewSchema.pre("findOneAndDelete", async function(next) {
  try {
    const id = this.getQuery()['_id'];
    if (!id) return next();
    await mongoose.model("Round").deleteMany({ interview: id });
    await mongoose.model("HR").deleteMany({ interview: id });
    await mongoose.model("Question").deleteMany({ interview: id });
    next();
  } catch (err) {
    next(err);
  }
});

const Interview = mongoose.model("Interview", InterviewSchema);
export default Interview;
