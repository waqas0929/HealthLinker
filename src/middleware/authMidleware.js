import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/jwt";

const authMiddleware = (req, res, next) => {
  const token = req.header.authorization?.split(" ")[1] || req.query.token;

  if (!token) {
    return res.status(404).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "invalid token" });
  }
};

export default authMiddleware;
