import express from "express";

import {createTodo} from "../controller/createTodo.js";

const router = express();

router.post("/create-todo", createTodo);

export default router;
