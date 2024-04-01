import express from "express";
import { getAllTodo, getTodo } from "../controller/getTodo.js";


const router = express();

router.get("/getall-todo", getAllTodo);
router.get("/get-todo/:id", getTodo);

export default router;
