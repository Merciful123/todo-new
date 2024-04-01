// Middleware function to get task by ID
import Task from "../models/task.js";

export async function getTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
        console.log("not found");

        return res.status(404).json({ message: "Task not found" });
    }
    req.task = task;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
