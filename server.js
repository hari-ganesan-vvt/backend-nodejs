import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";

//config
dotenv.config();
const app = express();
app.use(express.json());
app.use(logger("dev"));
app.use(cors());
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
//errorHandling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Custom server error";
  return res.status(status).json(message);
});

app.use("/", (req, res) => {
  res.send("server is working");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
