import express from "express";
import {
  getAllUser,
  userRegister,
  userLogin,
  userLogout,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/getUser", getAllUser);
router.post("/userRegister", userRegister);
router.post("/userLogin", userLogin);
router.post("/userLogout", userLogout);

export default router;
