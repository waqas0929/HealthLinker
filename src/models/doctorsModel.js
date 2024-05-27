import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const Doctor = sequelize.define("doctor", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("Male", "Female", "Other"),
    allowNull: false,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type: DataTypes.JSON,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hospitalClinic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  languagesSpoken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  insuranceAccepted: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Doctor;
