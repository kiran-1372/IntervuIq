import Round from "../models/Round.js";
import Interview from "../models/Interview.js";
import Question from "../models/Question.js";

/**
 * ✅ Create a new round for a specific interview
 */
export const createRound = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const userId = req.user._id; // from auth middleware
    const { roundName, roundNumber, interviewerName, date, duration } = req.body;

    // Validate interview existence
    const interview = await Interview.findOne({ _id: interviewId, user: userId });
    if (!interview) {
      return res.status(404).json({ message: "Interview not found or unauthorized access" });
    }

    // Basic validation
    if (!roundName) {
      return res.status(400).json({ message: "Round name is required" });
    }

    // Create new round
    const round = await Round.create({
      interview: interviewId,
      user: userId,
      roundName,
      roundNumber,
      interviewerName,
      date,
      duration,
      status: "draft",
    });

    // Push round into interview reference
    interview.rounds.push(round._id);
    await interview.save();

    res.status(201).json({
      message: "Round created successfully (saved as draft)",
      round,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating round", error: error.message });
  }
};

/**
 * 🧾 Get all rounds for a specific interview
 */
export const getRoundsByInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const userId = req.user._id;

    const rounds = await Round.find({ interview: interviewId, user: userId })
      .populate("questions")
      .sort({ roundNumber: 1 });

    res.status(200).json({ rounds });
  } catch (error) {
    res.status(500).json({ message: "Error fetching rounds", error: error.message });
  }
};

/**
 * ✏️ Update a round (partial or final)
 */
export const updateRound = async (req, res) => {
  try {
    const { roundId } = req.params;
    const userId = req.user._id;
    const updateData = req.body;

    const round = await Round.findOne({ _id: roundId, user: userId });
    if (!round) {
      return res.status(404).json({ message: "Round not found or unauthorized" });
    }

    // Merge new data (partial update)
    Object.assign(round, updateData);

    // Optional: validate roundNumber > 0
    if (round.roundNumber && round.roundNumber < 1) {
      return res.status(400).json({ message: "Round number must be >= 1" });
    }

    await round.save();

    res.status(200).json({
      message: "Round updated successfully",
      round,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating round", error: error.message });
  }
};

/**
 * ❌ Delete a round and its questions
 */
export const deleteRound = async (req, res) => {
  try {
    const { roundId } = req.params;
    const userId = req.user._id;

    const round = await Round.findOne({ _id: roundId, user: userId });
    if (!round) {
      return res.status(404).json({ message: "Round not found or unauthorized" });
    }

    // Delete all associated questions first
    await Question.deleteMany({ _id: { $in: round.questions } });

    // Remove reference from parent interview
    await Interview.updateOne(
      { _id: round.interview },
      { $pull: { rounds: roundId } }
    );

    await Round.findByIdAndDelete(roundId);

    res.status(200).json({ message: "Round and its questions deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting round", error: error.message });
  }
};

/**
 * 🔍 Get a single round (with questions)
 */
export const getRoundById = async (req, res) => {
  try {
    const { roundId } = req.params;
    const userId = req.user._id;

    const round = await Round.findOne({ _id: roundId, user: userId }).populate("questions");
    if (!round) {
      return res.status(404).json({ message: "Round not found or unauthorized" });
    }

    res.status(200).json({ round });
  } catch (error) {
    res.status(500).json({ message: "Error fetching round", error: error.message });
  }
};
