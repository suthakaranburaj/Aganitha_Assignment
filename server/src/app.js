import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { pasteRouter } from "./routes/pasteRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: [
            process.env.NEXT_PUBLIC_APP_URL,
            "https://aganitha-assignment-ztuw.onrender.com",
            "http://localhost:3000"
        ],
        credentials: true
    })
);

app.use(express.json());

app.use("/api", pasteRouter);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

export default app;
