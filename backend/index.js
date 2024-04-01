import express from "express";
import env from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import getAllTodoRoute from "./routes/getTodoRoute.js";
import getTodoRoute from "./routes/getTodoRoute.js";
import createTodoRoute from "./routes/createTodoRoute.js";
import updateTodoRoute from "./routes/updateTodoRoute.js";
import deleteTodoRoute from "./routes/deleteTodoRoute.js";
import path from "path";

env.config()

const PORT = process.env.PORT
const app = express();

app.use(express.json());


app.use(
  cors({
    origin: [
      "https://todoappbest.netlify.app",
      "https://main--todoappbest.netlify.app",
      "http://127.0.0.1:5173",
    ],
    methods: "GET,POST,PUT,DELETE",
  })
);

// Resolve the directory name using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Serve static files from the "dist" directory
app.use(express.static(path.resolve(__dirname, "dist")));
 

 
mongoose.connect(process.env.MONGODB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.get("*", (req, res) =>
  res.sendFile(path.resolve("dist", "index.html"))
);

app.use("/api", getAllTodoRoute);
app.use("/api", getTodoRoute);
app.use("/api", createTodoRoute);
app.use("/api", updateTodoRoute);
app.use("/api", deleteTodoRoute);


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});