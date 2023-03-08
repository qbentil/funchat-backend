
import { Router } from "express";
import { completeSignUp, signUp, login } from "../controllers/auth.controller";
import { sendMail } from "../middlewares/mail";

const router = Router();


// SIGNUP /user: create a new user
router.post("/signup", signUp, sendMail, completeSignUp);


router.post("/login", login)


export default router;