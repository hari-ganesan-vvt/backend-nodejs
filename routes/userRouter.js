import express from "express";
import { getUser, login, register } from "../controller/userController.js";

const router = express.Router();

router.get("/getUser", getUser);
router.post("/register", register);
router.post("/login", login);

export default router;
