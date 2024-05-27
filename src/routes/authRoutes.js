import express from 'express'
import authController from '../controller/authController.js'
// import { Router } from "express";

const authRouter = express.Router();

authRouter.post('/signup', authController.signup)
authRouter.post('/signin', authController.signin)

export default authRouter;
