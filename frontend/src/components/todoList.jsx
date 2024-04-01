import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getall-todo"
        );
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error.message);
      }
    };

    fetchTodos();
  }, []);

  

  const handleDelete = async (todoId) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete-todo/${todoId}`);
      setTodos(todos.filter((todo) => todo._id !== todoId));
      console.log("Todo deleted:", todoId);
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };


  return (
    <div className="flex w-screen justify-center">
      <ul role="list" className=" w-[95%] divide-y divide-gray-100">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between gap-x-6 py-8 shadow-lg px-4 max-sm:flex max-sm:flex-col"
          >
            <div className="flex w-full justify-between content-between gap-2">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {todo.title}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {todo.description}
                  </p>
                </div>
              </div>
              <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  Priority: {todo.priority}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Category: {todo.category}
                </p>
                <p
                  className={`${
                    todo.completed ? "bg-green-200" : "bg-red-200"
                  } mt-1 text-xs leading-5 text-gray-500 px-2 py-1 rounded-md`}
                >
                  Status: {todo.completed ? "Completed" : "Incomplete"}
                </p>
              </div>
            </div>

            <div className=" flex justify-between items-center gap-2 max-sm:mt-4 ">
              <Link to={`/edit-todo/${todo?._id}`}>
                <div className="text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                  </svg>
                </div>
              </Link>
                <div
                  onClick={() => handleDelete(todo._id)}
                  className="text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
