import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.js";
import interviewRoutes from "./routes/interview.js";
import questionRoutes from "./routes/question.js";
import roundRoutes from "./routes/round.js";

// Load environment variables early so other modules can read them
dotenv.config();

const app = express();
console.log("jwt_secret", process.env.JWT_SECRET);
app.use(express.json());
app.use(cookieParser());

// Allow the frontend (Vite dev server) to call the API. Adjust the origin
// as needed (e.g. to your deployed frontend URL).
app.use(
	cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", credentials: true })
);

// Mount API routes
app.use("/api/users", userRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/rounds", roundRoutes);

app.get("/", (req, res) => res.send("Backend running..."));

export default app;
