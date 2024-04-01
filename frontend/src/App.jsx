import CreateTodo from "./components/createTodoForm";
import HomePage from "./pages/homepage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  

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
