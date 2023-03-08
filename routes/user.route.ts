
import { Router } from "express";
import { getUsers } from "../controllers/user.controller";
import { VerifyAccessToken } from "../middlewares/Verification";


const router = Router();

// GET /user: get all users
router.get("/", VerifyAccessToken, getUsers);


export default router;