
import { Router } from "express";
import { getUsers } from "../controllers/user.controller";


const router = Router();

// GET /user: get all users
router.get("/", getUsers);


export default router;