import { Router } from "express";
import { loginUser } from "./controller";

const router = Router();

// login
router.route("/login").post(loginUser);

// logout
// router.route("/logout").get()

export default router;
