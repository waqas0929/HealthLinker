import appointmentRouter from "./appointmentRoutes.js";
import authRouter from "./authRoutes.js";
import doctorsRouter from "./doctorsRoutes.js";

const allRoutes = [appointmentRouter, authRouter, doctorsRouter];

export default allRoutes;
