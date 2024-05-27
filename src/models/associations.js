import doctorModel from "./doctorsModel.js";
import patientModel from "./patientModel.js";
import appointmentModel from "./appointmentModel.js";

// Define associations
doctorModel.hasMany(appointmentModel, { foreignKey: "doctorId" });
patientModel.hasMany(appointmentModel, { foreignKey: "patientId" });
appointmentModel.belongsTo(doctorModel, { foreignKey: "doctorId" });
appointmentModel.belongsTo(patientModel, { foreignKey: "patientId" });



export { doctorModel, patientModel, appointmentModel };
