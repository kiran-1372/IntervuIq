import express from "express";
import {
  createInterview,
  updateInterview,
  deleteInterview,
  getUserInterviews,
  getInterviewById,
  saveInterviewAsDraft,
  submitInterview,
} from "../controllers/interview.js"
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ All routes are protected (user must be logged in)
router.use(protect);

/**
 * @route   POST /api/interviews
 * @desc    Create a new interview (either draft or final)
 * @access  Private
 */
router.post("/", createInterview);

/**
 * @route   GET /api/interviews
 * @desc    Get all interviews of logged-in user
 * @access  Private
 */
router.get("/", getUserInterviews);

/**
 * @route   GET /api/interviews/:id
 * @desc    Get single interview details by ID
 * @access  Private
 */
router.get("/:id", getInterviewById);

/**
 * @route   PUT /api/interviews/:id
 * @desc    Update interview details
 * @access  Private
 */
router.put("/:id", updateInterview);

/**
 * @route   PATCH /api/interviews/:id/draft
 * @desc    Save interview as draft (partial save)
 * @access  Private
 */
router.patch("/:id/draft", saveInterviewAsDraft);

/**
 * @route   PATCH /api/interviews/:id/submit
 * @desc    Submit final interview details
 * @access  Private
 */
router.patch("/:id/submit", submitInterview);

/**
 * @route   DELETE /api/interviews/:id
 * @desc    Delete interview and all related data (rounds/questions)
 * @access  Private
 */
router.delete("/:id", deleteInterview);

export default router;
