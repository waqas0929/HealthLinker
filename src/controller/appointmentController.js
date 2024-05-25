import Appointment from "../models/appointment.js";
import Doctor from "../models/doctorsModel.js";
import Patient from "../models/patientModel.js";
import { Op } from "sequelize";

const appointmentController = {
  // create api
  createAppointment: async (req, res) => {
    const { doctorId, patientId, date, time, reason } = req.body;

    try {
      const doctor = await Doctor.findByPk(doctorId);
      if (!doctor) return res.status(404).json({ message: "Doctor not found" });

      const patient = await Patient.findByPk(patientId);
      if (!patient)
        return res.status(404).json({ message: "Patient not found" });

      const existingAppointment = await Appointment.findOne({
        where: {
          doctorId,
          date,
          time,
        },
      });

      if (existingAppointment)
        return res
          .status(400)
          .json({ message: "Doctor already has an appointment at this time" });

      const appointment = await Appointment.create({
        doctorId,
        patientId,
        date,
        time,
        reason,
      });
      res.status(200).json({ message: "appointment created", appointment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error", error });
    }
  },

  //get All
  getAppointmentForDoctor: async (req, res) => {
    const { doctorId } = req.params;

    try {
      const doctor = await Doctor.findByPk(doctorId);
      if (!doctor) {
        res.status(404).json({ message: "Doctor Not found" });
      }

      const appointments = await Doctor.findAll({
        where: {
          doctorId,
        },
        include: [Patient],
      });

      res.status(200).json(appointments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  //get all appointment of patient
  getAllAppointmentForPatient: async (req, res) => {
    const { patientId } = req.params;
    try {
      const patient = await Patient.findByPk(patientId);
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }

      const appointments = await Appointment.findAll({
        where: [patientId],
        include: [Doctor],
      });
      res.status(200).json({ appointments });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error", error });
    }
  },

  //update an appointment
  updateAppointment: async (req, res) => {
    const { appointmentId } = req.params;
    const { date, time, reason } = req.body;
    try {
      const appointment = await Appointment.findByPk(appointmentId);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      const existingAppointment = await Appointment.findOne({
        where: {
          doctorId: appointment.doctorId,
          date,
          time,
          id: { [Op.ne]: appointmentId },
        },
      });

      if (existingAppointment) {
        res
          .status(400)
          .json({ message: "Doctor already has an appointment at this time" });
      }

      (appointment.date = date),
        (appointment.time = time),
        (appointment.reason = reason);

      await appointment.save();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  //delete appointment
  deleteAppointment: async (req, res) => {
    const { appointmentId } = req.params;
    try {
      const appointment = await appointmentId.findByPk(appointmentId);
      if (!appointment) {
        res.status(404).json({ message: "appointment not found" });
      }

      await appointment.destroy;
    } catch (error) {
      console.loge(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

export default appointmentController;
