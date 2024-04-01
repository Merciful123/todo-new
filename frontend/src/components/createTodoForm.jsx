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
          `https://new-todo-0gxb.onrender.com/api/get-todo/${params?.id}`
        );
        setTodo(response?.data);
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
      const response = await axios.get(
        `https://new-todo-0gxb.onrender.com/api/getall-todo`
      );
      console.log(response)
      setTodo(response?.data);
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
          `https://new-todo-0gxb.onrender.com/api/update-todo/${params?.id}`,
          todo
        );
       setAlert("Todo updated successfully!"); // Set alert message
        setTimeout(() => {
          setAlert(null);
        }, 1000);
      } else {
        // Add new todo

        await axios.post(
          "https://new-todo-0gxb.onrender.com/api/create-todo",
          todo
        );
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


import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export  const Modal = ()=> {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Deactivate account
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All of your data will be permanently
                          removed. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
