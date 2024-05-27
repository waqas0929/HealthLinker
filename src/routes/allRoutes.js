import appointmentRouter from "./appointmentRoutes.js";
import authRouter from "./authRoutes.js";
import doctorsRouter from "./doctorsRoutes.js";
import patientsRouter from "./patientRoutes.js";

const allRoutes = [
  appointmentRouter,
  authRouter,
  doctorsRouter,
  patientsRouter,
];

export default allRoutes;
