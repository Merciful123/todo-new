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

app.use(cors());

async function connectDatabase() {

    try {
        const uri = process.env.MONGODB_URL;
        await mongoose.connect(uri);
        console.log(`Server connected to port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
}

connectDatabase()

// Resolve the directory name using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Serve static files from the "dist" directory
app.use(express.static(path.resolve(__dirname, "dist")));
 


app.use("/api", getAllTodoRoute);
app.use("/api", getTodoRoute);
app.use("/api", createTodoRoute);
app.use("/api", updateTodoRoute);
app.use("/api", deleteTodoRoute);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});