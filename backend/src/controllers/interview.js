import Interview from "../models/Interview.js";
import asyncHandler from "express-async-handler";

/**
 * @desc Create a new interview (can be draft)
 * @route POST /api/interviews
 * @access Private
 */
export const createInterview = asyncHandler(async (req, res) => {
  const { company, role, date, location, status, salary, hr, feedback, nextSteps } = req.body;

  if (!company || !role) {
    return res.status(400).json({ message: "Company and Role are required." });
  }

  // Check for duplicate interview
  const existingInterview = await Interview.findOne({
    user: req.user._id,
    company: company.trim(),
    role: role.trim(),
    date: date ? new Date(date) : null,
  });

  if (existingInterview) {
    return res.status(400).json({
      message: "Interview for this company, role, and date already exists.",
    });
  }

  const interview = await Interview.create({
    user: req.user._id,
    company: company.trim(),
    role: role.trim(),
    date,
    location,
    status: status || "draft",
    salary,
    hr,
    feedback,
    nextSteps,
  });

  res.status(201).json({
    message: "Interview created successfully.",
    interview,
  });
});

/**
 * @desc Get all interviews for the logged-in user
 * @route GET /api/interviews
 * @access Private
 */
export const getUserInterviews = asyncHandler(async (req, res) => {
  const interviews = await Interview.find({ user: req.user._id })
    .populate("rounds")
    .sort({ createdAt: -1 });

  res.status(200).json(interviews);
});

/**
 * @desc Get single interview by ID
 * @route GET /api/interviews/:id
 * @access Private
 */
export const getInterviewById = asyncHandler(async (req, res) => {
  const interview = await Interview.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate({
    path: "rounds",
    populate: { path: "questions" },
  });

  if (!interview) {
    return res.status(404).json({ message: "Interview not found." });
  }

  res.status(200).json(interview);
});

/**
 * @desc Update interview details
 * @route PUT /api/interviews/:id
 * @access Private
 */
export const updateInterview = asyncHandler(async (req, res) => {
  const interview = await Interview.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!interview) {
    return res.status(404).json({ message: "Interview not found." });
  }

  // Prevent accidental overwriting with empty values
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([_, v]) => v !== undefined && v !== "")
  );

  Object.assign(interview, updates);
  await interview.save();

  res.status(200).json({
    message: "Interview updated successfully.",
    interview,
  });
});

/**
 * @desc Mark interview as completed/submitted
 * @route PATCH /api/interviews/:id/submit
 * @access Private
 */
export const submitInterview = asyncHandler(async (req, res) => {
  const interview = await Interview.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!interview) {
    return res.status(404).json({ message: "Interview not found." });
  }

  interview.status = "completed";
  await interview.save();

  res.status(200).json({ message: "Interview submitted successfully.", interview });
});

/**
 * @desc Delete interview and its associated rounds/questions
 * @route DELETE /api/interviews/:id
 * @access Private
 */
export const deleteInterview = asyncHandler(async (req, res) => {
  const interview = await Interview.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate({
    path: "rounds",
    populate: { path: "questions" },
  });

  if (!interview) {
    return res.status(404).json({ message: "Interview not found." });
  }

  // Remove all rounds and their questions
  for (const round of interview.rounds) {
    await round.deleteOne();
  }

  await interview.deleteOne();

  res.status(200).json({ message: "Interview deleted successfully." });
});
