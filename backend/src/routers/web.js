import express from 'express';
import { getTask, getTaskbyId, addTask, removeTask, updateTask} from '../controller/taskController.js';


const { Router } = express;

const router = Router();

router.get("/",getTask);
router.get("/Task/:id",getTaskbyId);;
router.post("/Post", addTask);
router.delete("/:id", removeTask);
router.put("/Task/:id", updateTask);

export default router;