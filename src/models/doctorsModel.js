import { DataTypes } from "sequelize";
import sequelize from "../db/config";

const doctorModel = sequelize.define("doctor", {
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

export default doctorModel;
