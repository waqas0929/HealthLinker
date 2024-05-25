import { DataTypes } from "sequelize";
import sequelize from "../db/config";

const appointmentModel = sequelize.define("appointment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default appointmentModel;
