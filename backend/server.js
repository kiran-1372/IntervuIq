import dotenv from "dotenv";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

dotenv.config();
connectDB();
console.log("jwt_secret",process.env.JWT_SECRET)
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

