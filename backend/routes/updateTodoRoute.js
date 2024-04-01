import express from "express";

import {updateTodo} from "../controller/updateTodo.js";


const router = express();

router.put("/update-todo/:id" , updateTodo)


export default router;