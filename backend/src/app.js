import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();
console.log("jwt_secret",process.env.JWT_SECRET)
app.use(express.json());
app.use(cookieParser());
//app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Backend running..."));

export default app;
