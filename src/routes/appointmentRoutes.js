import express from "express";
import appointmentController from "../controller/appointmentController.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/addAppointment",appointmentController.createAppointment);
appointmentRouter.get("/doctor/:id",appointmentController.getAppointmentForDoctor);
appointmentRouter.get("/patient/:id",appointmentController.getAllAppointmentForPatient);
appointmentRouter.put("/patient/:id",appointmentController.updateAppointment);
appointmentRouter.delete("/:id",appointmentController.deleteAppointment);

export default appointmentRouter;
