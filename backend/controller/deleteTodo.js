import Task from "../models/task.js";

// Delete a task by ID
export const deleteTodo = async (req, res) => {
  try {
    const taskId = req.params.id; // Get the task ID from the request parameters

    // Delete the task
    await Task.findByIdAndDelete(taskId);

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};