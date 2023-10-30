import { Router } from "express";
import {
  getDonna,
 /*  getTask,
  createTask,
  deleteTask,
  updateTask, */
} from "../controllers/donna.controller";

const router = Router();

router.get("/donna", getDonna);

/* router.get("/tasks/:id", getTask);

router.post("/tasks", createTask);

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask); */

export default router;
