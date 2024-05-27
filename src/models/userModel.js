import { DataTypes } from "sequelize";

import sequelize from "../db/config.js";

const userModel = sequelize.define('user',{
    id:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validation:{isEmail:true}
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.ENUM('Doctor','Patient')
    }
})


export default userModel