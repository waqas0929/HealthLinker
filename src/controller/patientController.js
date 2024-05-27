import Patient from "../models/patientModel.js";

const patientController = {
  createPatient: async (req, res) => {
    const {
      name,
      email,
      age,
      address,
      phoneNumber,
      gender,
      // qualifications,
      profilePicture,
      languagesSpoken,
      bloodGroup,
    } = req.body;

    try {
      const existingPatient = await Patient.findOne({ where: { email } });
      if (existingPatient) {
        return res
          .status(400)
          .json({ message: "Patient is already exist with this email" });
      }

      const patient = await Patient.create({
        name,
        email,
        age,
        address,
        phoneNumber,
        gender,
        // qualifications,
        profilePicture,
        languagesSpoken,
        bloodGroup,
      });

      res
        .status(200)
        .json({ message: "Patient created successfully", patient });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  getAllPatient: async (req, res) => {
    try {
      const patient = await Patient.findAll();
      res.status(200).json(patient);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  getPatientById: async (req, res) => {
    const { id } = req.params;

    try {
      const patient = await Patient.findByPk(id);

      if (!patient) {
        return res
          .status(404)
          .json({ message: "Patient with this id not available" });
      }

      res.status(200).json(patient);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  updatePatient: async (req, res) => {
    const { id } = req.params;
    const {
      name,
      email,
      age,
      address,
      phoneNumber,
      gender,
      // qualifications,
      profilePicture,
      languagesSpoken,
      bloodGroup,
    } = req.body;

    try {
      const patient = await Patient.findByPk(id);
      if (!patient) {
        return res
          .status(404)
          .json({ message: "Patient with this id is not available" });
      }

      patient.name = name;
      patient.email = email;
      patient.age = age;
      patient.address = address;
      patient.phoneNumber = phoneNumber;
      patient.gender = gender;
      // patient.qualifications = qualifications;
      patient.profilePicture = profilePicture;
      patient.languagesSpoken = languagesSpoken;
      patient.bloodGroup = bloodGroup;
      await patient.save();

      res.status(200).json({ message: "Patient details updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  deletePatient: async (req, res) => {
    const { id } = req.params;
    try {
      const patient = await Patient.findByPk(id);
      if (!patient) {
        return res
          .status(404)
          .json({ message: "Patient with this id is not available" });
      }

      await patient.destroy();
      res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

export default patientController;
