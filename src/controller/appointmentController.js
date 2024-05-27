import { doctorModel, patientModel, appointmentModel } from '../models/associations.js';
import { Op } from "sequelize";

const appointmentController = {
  // create api
  createAppointment: async (req, res) => {
    const { name, doctorId, patientId, date, time, reason } = req.body;

    try {
      const doctor = await doctorModel.findByPk(doctorId);
      if (!doctor) return res.status(404).json({ message: "Doctor not found" });

      const patient = await patientModel.findByPk(patientId);
      if (!patient) return res.status(404).json({ message: "Patient not found" });

      const existingAppointment = await appointmentModel.findOne({
        where: {
          name,
          doctorId,
          date,
          time,
        },
      });

      if (existingAppointment)
        return res.status(400).json({ message: "Doctor already has an appointment at this time" });

      const appointment = await appointmentModel.create({
        name,
        doctorId,
        patientId,
        date,
        time,
        reason,
      });
      res.status(201).json({ message: "Appointment created", appointment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  // get all appointments for a doctor
  getAppointmentForDoctor: async (req, res) => {
    const { id: doctorId } = req.params;

    try {
      const doctor = await doctorModel.findByPk(doctorId);
      if (!doctor) return res.status(404).json({ message: "Doctor not found" });

      const appointments = await appointmentModel.findAll({
        where: {
          doctorId,
        },
        include: [{
          model: patientModel,
          attributes: ['name', 'age', 'phoneNumber'],
        }],
      });

      res.status(200).json(appointments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  // get all appointments for a patient
  getAllAppointmentForPatient: async (req, res) => {
    const { id: patientId } = req.params;

    try {
      const patient = await patientModel.findByPk(patientId);
      if (!patient) return res.status(404).json({ message: "Patient not found" });

      const appointments = await appointmentModel.findAll({
        where: {
          patientId,
        },
        include: [{
        model: doctorModel,
        attributes: ['name', 'phoneNumber', 'availability', 'hospitalClinic'],
      }],
      });

      res.status(200).json({ appointments });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  // update an appointment
  updateAppointment: async (req, res) => {
    const { id: appointmentId } = req.params;
    const { date, time, reason } = req.body;

    try {
      const appointment = await appointmentModel.findByPk(appointmentId);
      if (!appointment) return res.status(404).json({ message: "Appointment not found" });

      const existingAppointment = await appointmentModel.findOne({
        where: {
          doctorId: appointment.doctorId,
          date,
          time,
          id: { [Op.ne]: appointmentId },
        },
      });

      if (existingAppointment) {
        return res.status(400).json({ message: "Doctor already has an appointment at this time" });
      }

      appointment.date = date;
      appointment.time = time;
      appointment.reason = reason;

      await appointment.save();
      res.status(200).json({ message: "Appointment updated", appointment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  // delete appointment
  deleteAppointment: async (req, res) => {
    const { id: appointmentId } = req.params;

    try {
      const appointment = await appointmentModel.findByPk(appointmentId);
      if (!appointment) return res.status(404).json({ message: "Appointment not found" });

      await appointment.destroy();
      res.status(200).json({ message: "Appointment deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

export default appointmentController;
