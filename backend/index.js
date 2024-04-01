import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import getAllTodoRoute from "./routes/getTodoRoute.js";
import getTodoRoute from "./routes/getTodoRoute.js";
import createTodoRoute from "./routes/createTodoRoute.js";
import updateTodoRoute from "./routes/updateTodoRoute.js";
import deleteTodoRoute from "./routes/deleteTodoRoute.js";

env.config();

const PORT = process.env.PORT || 6000;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

// // Enable CORS
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: "*",
//   })
// );

// Serve static files
const __dirname = path.resolve();
app.use(express.static(path.resolve(__dirname, "dist")));

// MongoDB Connection
mongoose
    .connect(MONGODB_URL,
        // { useNewUrlParser: true, useUnifiedTopology: true }
    )
  .then(() => {
    console.log("MongoDB connected successfully");
    // Start the server after MongoDB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Handle all other routes
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "dist", "index.html"))
);

// API routes
app.use("/api", getAllTodoRoute);
app.use("/api", getTodoRoute);
app.use("/api", createTodoRoute);
app.use("/api", updateTodoRoute);
app.use("/api", deleteTodoRoute);

