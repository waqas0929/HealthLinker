import express from "express";
// import appointmentController from "../controller/appointmentController.js"

import{createAppointment, getAppointmentForDoctor, getAllAppointmentForPatient, updateAppointment, deleteAppointment }

const appointmentRouter = express.Router();





appointmentRouter.post("./appointment", appointmentRouter.createAppointment)

export default appointmentRouter;
