import doctorsModel from "../models/doctorsModel.js";
import patientModel from "../models/patientModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
// import sequelize from "./config.js";

const syncDB = async () => {
  await doctorsModel.sync({ alter: true, force: false });
  await patientModel.sync({ alter: true, force: false });
  await appointmentModel.sync({ alter: true, force: false });
  await userModel.sync({alter:true, force:false})
  // await sequelize.sync({force: true, alter: true})
};

export default syncDB;
