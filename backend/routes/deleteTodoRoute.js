import express from "express";

import {deleteTodo} from "../controller/deleteTodo.js";
import { getTask } from "../middleware/getTask.js";

const router = express();

router.delete("/delete-todo/:id", getTask, deleteTodo);

export default router;
