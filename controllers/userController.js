import db from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errorHandler from "../middlewares/errorHandler.js";

//register
export const userRegister = (req, res, next) => {
  //check existing user
  const { email, username, password } = req.body;
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length)
      return next(
        errorHandler(401, { status: "success", message: "User already exits!" })
      );

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [username, email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json({ status: "success", message: "User successfully created" });
    });
  });
};

//login
export const userLogin = (req, res, next) => {
  const { email, password } = req.body;
  //CHECK USER
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return next(
        errorHandler(404, { status: "success", message: "User not found!" })
      );

    //Check password
    const isPasswordCheck = bcrypt.compareSync(password, data[0].password);
    if (!isPasswordCheck)
      return next(
        errorHandler(401, {
          status: "success",
          message: "Invalid Email or Password!",
        })
      );

    //token
    const userToken = jwt.sign(
      { id: data[0].id, email: data[0].email },
      process.env.JWT_SECRET_KEY
    );

    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    return res.cookie("access_token", userToken, options).status(200).json({
      status: "success",
      userId: data[0].id,
      message: "User successfully Login",
    });
  });
};

//logout
export const userLogout = (req, res) => {
  return res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ status: "success", message: "User has been logged out." });
};

//getUser
export const getAllUser = (req, res) => {
  var listQuery = "SELECT * FROM `users`";

  db.query(listQuery, function (error, data) {
    if (error) {
      throw error;
    } else {
      return res.status(200).json({ length: data.length, Data: data });
    }
  });
};
