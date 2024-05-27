import { Router } from "express";
import doctorsController from "../controller/doctorsController.js";

const doctorsRouter = Router();

doctorsRouter.post("/addDoctor", doctorsController.createDoctor);
doctorsRouter.get("/getAllDoctor", doctorsController.getAllDoctor);
doctorsRouter.get("/getDoctorById/:id", doctorsController.getDoctorById);
doctorsRouter.put("/updateDoctor/:id", doctorsController.updateDoctor);
doctorsRouter.delete("/deleteDoctor/:Id", doctorsController.deleteDoctor);

export default doctorsRouter;
