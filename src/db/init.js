import appointmentModel from "../models/appointment.js"
import doctorsModel from "../models/doctorsModel.js"
import patientModel from "../models/patientModel.js"



const syncDB = async () =>{
    await appointmentModel.sync({alter:true, force:false});
    await doctorsModel.sync({alter:true, force:false})
    await patientModel.sync({alter:true, force:false})
    

} 

export default syncDB