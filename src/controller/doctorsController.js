import Doctor from "../models/doctorsModel.js";

const doctorsController = {
  createDoctor: async (req, res) => {
    const {
      name,
      email,
      specialization,
      address,
      phoneNumber,
      gender,
      // qualifications,
      experience,
      availability,
      profilePicture,
      hospitalClinic,
      languagesSpoken,
      insuranceAccepted,
    } = req.body;

    try {
      const existingDoctor = await Doctor.findOne({ where: { email } });
      if (existingDoctor) {
        return res
          .status(400)
          .json({ message: "Doctor is already exist with this email" });
      }

      const doctor = await Doctor.create({
        name,
        email,
        specialization,
        address,
        phoneNumber,
        gender,
        // qualifications,
        experience,
        availability,
        profilePicture,
        hospitalClinic,
        languagesSpoken,
        insuranceAccepted,
      });

      res.status(200).json({ message: "Doctor created successfully", doctor });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  getAllDoctor: async (req, res) => {
    try {
      const doctors = await Doctor.findAll();
      res.status(200).json(doctors);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  getDoctorById: async (req, res) => {
    const { id } = req.params;

    try {
      const doctor = await Doctor.findByPk(id);

      if (!doctor) {
        return res
          .status(404)
          .json({ message: "Doctor with this id not available" });
      }

      res.status(200).json(doctor);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  updateDoctor: async (req, res) => {
    const { id } = req.params;
    const {
      name,
      email,
      specialization,
      address,
      phoneNumber,
      gender,
      // qualifications,
      experience,
      availability,
      profilePicture,
      hospitalClinic,
      languagesSpoken,
      insuranceAccepted,
    } = req.body;

    try {
      const doctor = await Doctor.findByPk(id);
      if (!doctor) {
        return res
          .status(404)
          .json({ message: "Doctor with this id is not available" });
      }

      doctor.name = name;
      doctor.email = email;
      doctor.specialization = specialization;
      doctor.address = address;
      doctor.phoneNumber = phoneNumber;
      doctor.gender = gender;
      // doctor.qualifications = qualifications;
      doctor.experience = experience;
      doctor.availability = availability;
      doctor.profilePicture = profilePicture;
      doctor.hospitalClinic = hospitalClinic;
      doctor.languagesSpoken = languagesSpoken;
      doctor.insuranceAccepted = insuranceAccepted;
      await doctor.save();

      res.status(200).json({ message: "Doctor details updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  deleteDoctor: async (req, res) => {
    const { id } = req.params;
    try {
      const doctor = await Doctor.findByPk(id);
      if (!doctor) {
        return res
          .status(404)
          .json({ message: "Doctor with this id is not available" });
      }

      await doctor.destroy();
      res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

export default doctorsController;
