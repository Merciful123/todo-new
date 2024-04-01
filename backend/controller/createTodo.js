import Task from "../models/task.js";

// Create a new task
export const createTodo = async (req, res) => {
  try {
    // Extract task details from the request body
    const { title, description, priority, category, completed } = req.body;

    // Check if a task with similar details already exists
    const existingTask = await Task.findOne({
      title,
      description,
      priority,
      category,
      completed,
    });
    if (existingTask) {
      return res
        .status(400)
        .json({ message: "Task with similar details already exists" });
    }

    // Create a new task object
    const newTask = new Task({
      title,
      description,
      priority,
      category,
      completed,
    });

    // Save the new task to the database
    const savedTask = await newTask.save();

    // Respond with the newly created task
    res.status(201).json(savedTask);
  } catch (error) {
    // Handle any errors that occur during task creation
    console.error("Error creating task:", error);
    res.status(500).json({ message: error.message });
  }
};
