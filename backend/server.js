import express from "express";
import connectDB from "./config/mongoDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.static("public")); 
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);

connectDB();
connectCloudinary();
// process.on("uncaughtException", (err) => { process.exit(1);});
// process.on("SIGINT", () => {process.exit(0);});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

