import express from "express";
import dotenv from "dotenv";
import db from "./config/database.js";
import logger from "morgan";
import userRouter from "./routes/userRouter.js";
dotenv.config();

//db connection
db.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("Database is connected successfully!");
  }
});

const app = express();
app.use(express.json());
app.use(logger("dev"));
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
