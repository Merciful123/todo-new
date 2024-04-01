import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CreateTodo = () => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "",
    completed: false,
  });
  const [alert, setAlert] = useState(null); // Alert state
  const [formErrors, setFormErrors] = useState({}); // Form validation errors

  const params = useParams();

  const fetchTodoById = async () => {
    if (params?.id) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get-todo/${params?.id}`
        );
        setTodo(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchTodoById();
  }, [params?._id]);

  //  getting all todos
  const fetchTodoAll = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/getall-todo`);
      setTodo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTodoAll();
  }, []);
  useEffect(() => {
    fetchTodoById();
  }, [params?._id]);


  // handling form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  // addind and editing api call

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Stop form submission if validation fails
      const isValid = validateForm(); // Validate form fields
      if (!isValid) return;
      if (params?.id) {
        // Update existing todo
        await axios.put(
          `http://localhost:8000/api/update-todo/${params?.id}`,
          todo
        );
        setAlert("Todo updated successfully!"); // Set alert message
        setTimeout(() => {
          setAlert(null);
        }, 1000);
      } else {
        // Add new todo

        await axios.post("http://localhost:8000/api/create-todo", todo);
        setAlert("Todo created successfully!"); // Set alert message
        setTimeout(() => {
          setAlert(null);
        }, 1000);
      }
      setTodo({
        title: "",
        description: "",
        priority: "medium",
        category: "",
        completed: false,
      });
    } catch (error) {
      console.error("Error submitting todo:", error.message);
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!todo?.title?.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!todo?.description?.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };
  return (
    <div className=" flex flex-col w-screen   justify-center">
      {alert && (
        <div
          className="bg-green-100 border w-1/2 max-sm:w-[95%] flex justify-center items-center mx-auto mb-2 border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {alert}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              onClick={() => setAlert(null)}
              className="fill-current h-6 w-6 text-green-500 cursor-pointer"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1 1 0 0 1-1.414 1.414l-3.535-3.536-3.536 3.536a1 1 0 1 1-1.414-1.414l3.536-3.535-3.536-3.536a1 1 0 1 1 1.414-1.414l3.536 3.536 3.535-3.536a1 1 0 0 1 1.414 1.414l-3.536 3.536 3.536 3.535z" />
            </svg>
          </span>
        </div>
      )}
      <div className="flex w-[50%] max-sm:w-[95%] justify-between px-2 mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Create New Todo</h1>
        <Link to="/">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer border-2">
            Back
          </div>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-[50%] max-sm:w-[95%] flex flex-col mx-auto px-2"
      >
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={todo?.title}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-2 border-2"
            required
          />
          {formErrors.title && (
            <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={todo.description}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-2 border-2"
            rows="3"
            required
          ></textarea>
          {formErrors.description && (
            <p className="text-red-500 text-xs mt-1">
              {formErrors.description}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="priority" className="block mb-1">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={todo.priority}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-2 border-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={todo.category}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-2 border-2"
          />
        </div>
        <div className="flex justify-start items-center gap-2">
          <label htmlFor="completed" className="mb-1">
            Completed
          </label>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={todo.completed}
            onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
            className="rounded-md border-gray-300 p-2 border-2"
          />
        </div>
        <div>
          <input
            onClick={handleSubmit}
            type="submit"
            value={params?.id ? "Edit Todo" : "Create Todo"}
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer border-2"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;

