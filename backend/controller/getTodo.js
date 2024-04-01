import Task from "../models/task.js";


// Get all tasks
export const getAllTodo = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
      console.log("all")
    res.status(500).json({ message: error.message });
  }
};

// Get a specific task by ID
export const getTodo = async (req, res) => {
  try {
    const taskId = req.params.id; // Get the task ID from the request parameters
    const task = await Task.findById(taskId); // Find the task by its ID in the database

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // If the task exists, send it as a JSON response
    res.json(task);
  } catch (error) {
    // Handle any errors that occur during the database query or response sending
    res.status(500).json({ message: error.message });
    console.log("single")
  }
};


