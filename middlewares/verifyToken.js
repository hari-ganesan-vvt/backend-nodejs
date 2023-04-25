import jwt from "jsonwebtoken";
import errorHandler from "./errorHandler";

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token)
    return next(
      errorHandler(401, { status: "success", message: "Token not found!" })
    );

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err)
      return next(
        errorHandler(401, {
          status: "success",
          message: "Authendication failed!",
        })
      );
    req.user = user;
    next();
  });
};

export default verifyToken;
