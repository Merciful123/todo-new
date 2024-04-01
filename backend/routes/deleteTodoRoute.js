import express from "express";

import {deleteTodo} from "../controller/deleteTodo.js";

const router = express();

router.delete("/delete-todo/:id", deleteTodo);

export default router;
