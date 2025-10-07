import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

router.post("/user", createUser);
router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

router.post("/task", createTask);
router.get("/task", getTasks);
router.get("/task/:id", getTaskById);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
