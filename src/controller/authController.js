import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorsModel.js";
import patientModel from "../models/userModel.js";

const authController = {
  signup: async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const hPassword = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({
        name,
        email,
        password: hPassword,
        role,
      });
      if (role === "Doctor") {
        await doctorModel.create({ userId: newUser.id, ...req.body });
      } else if (role === "Patient ") {
        await patientModel.create({ userId: newUser.id, ...req.body });
      }
      const token = jwt.sign(
        { id: newUser.id, role: newUser.role },
        process.env.JWT_SECRET_KEY,
        { expireIn: "10min" }
      );
      res.status(200).json({ message: "user created", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error", error });
    }
  },
  signin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: "User not found" });

      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(404).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "10min" }
      );
      res.status(200).json({ message: "user login successfully", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error", error });
    }
  },
};

export default authController;
