import CreateTodo from "./components/createTodoForm";
import TodoList from "./components/todoList";
import HomePage from "./pages/homepage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <HomePage />,
  //   },
  //   {
  //     path: "/add-todo",
  //     element: <CreateTodo />,
  //   },
  //   {
  //     path: "/edit-todo/:id",
  //     element: <CreateTodo />,
  //   },
  // ]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-todo" element={<CreateTodo />} /> 
         <Route path="/edit-todo/:id" element={<CreateTodo />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}
