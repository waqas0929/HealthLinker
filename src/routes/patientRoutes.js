import { Router } from "express";
import patientController from "../controller/patientController.js";

const patientsRouter = Router();

patientsRouter.post("/addPatient", patientController.createPatient);
patientsRouter.get("/getAllPatients", patientController.getAllPatient);
patientsRouter.get("/getPatientById/:id", patientController.getPatientById);
patientsRouter.put("/updatePatient/:id", patientController.updatePatient);
patientsRouter.delete("/deletePatient/:id", patientController.deletePatient);

export default patientsRouter;
