import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CreateTodo = () => {

  
  // console.log(tododata)
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "",
    completed: false,
  });
  const [todos, setTodos] = useState([]);

  const params = useParams();

  console.log(params?.id)
  const fetchTodoById = async () => {
    try {

      const response = await axios.get(`http://localhost:8000/api/get-todo/${params?.id}`); 
      console.log(response.data)
      setTodo(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() =>{
    fetchTodoById()
  }, [params?._id])
  const fetchTodoAll = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getall-todo`
      );
      console.log(response.data);
      setTodo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTodoAll()
  },[])
  useEffect(() => {
    fetchTodoById();
  }, [params?._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };
console.log(todo)
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (params?.id) {
      // Update existing todo
      await axios.put(
        `http://localhost:8000/api/update-todo/${params.id}`,
        todo
      );

      console.log("Todo updated:", params.id);
    } else {
      // Add new todo
      await axios.post("http://localhost:8000/api/create-todo", todo);
      console.log("Todo added:", todo);
    }
  } catch (error) {
    console.error("Error submitting todo:", error.message);
  }
};



  return (
    <div className=" flex flex-col w-screen   justify-center">
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
            Title:
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
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={todo.description}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-2 border-2"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label htmlFor="priority" className="block mb-1">
            Priority:
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
            Category:
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
        <div>
          <label htmlFor="completed" className="block mb-1">
            Completed:
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
