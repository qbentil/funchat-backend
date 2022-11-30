
import { Router } from "express";
import { getUsers, signUp } from "../controllers/user.controller";

const router = Router();

// GET /user: get all users
router.get("/", getUsers);

// POST /user: create a new user
router.post("/", signUp);


export default router;