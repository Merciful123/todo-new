import Task from "../models/task.js";

// Update a task by ID
export const updateTodo = async (req, res) => {
  try {
    const taskId = req.params.id; // Get the task ID from the request parameters

    // Check if the task object exists in the request
    const existingTask = await Task.findById(taskId);
    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Extract task details from the request body
    const { title, description, priority, category, completed } = req.body;

    // Validate and update task fields
    if (title !== undefined) {
      existingTask.title = title;
    }
    if (description !== undefined) {
      existingTask.description = description;
    }
    if (priority !== undefined) {
      // Example validation for priority field
      const validPriorities = ["low", "medium", "high"];
      if (validPriorities.includes(priority.toLowerCase())) {
        existingTask.priority = priority.toLowerCase();
      } else {
        return res.status(400).json({ message: "Invalid priority value" });
      }
    }
    if (category !== undefined) {
      existingTask.category = category;
    }
    if (completed !== undefined) {
      // Example validation for completed field
      if (typeof completed === "boolean") {
        existingTask.completed = completed;
      } else {
        return res
          .status(400)
          .json({ message: "Completed field must be a boolean" });
      }
    }

    // Save updated task using the Task model
    const updatedTask = await existingTask.save();
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: error.message });
  }
};
