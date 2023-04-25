import db from "../config/database.js";
import bcrypt from "bcrypt";

//register
export const register = (req, res) => {
  //check existing user
  const { email, username, password } = req.body;
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length)
      return res
        .status(401)
        .json({ status: "success", message: "User already exits!" });

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [username, email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({
        status: "success",
        message: "User successfully created",
      });
    });
  });
};

//login
export const login = (req, res) => {
  const { email, password } = req.body;
  //CHECK USER
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res
        .status(404)
        .json({ status: "success", message: "User not found!" });

    //Check password
    const isPasswordCheck = bcrypt.compareSync(password, data[0].password);

    if (!isPasswordCheck)
      return res
        .status(401)
        .json({ status: "success", message: "Invalid Email or Password!" });

    res.status(200).json({
      status: "success",
      userId: data[0].id,
      message: "User successfully Login",
    });
  });
};

//getUser
export const getUser = (req, res) => {
  var listQuery = "SELECT * FROM `users`";

  db.query(listQuery, function (error, data) {
    if (error) {
      throw error;
    } else {
      res.json({ length: data.length, Data: data });
    }
  });
};
