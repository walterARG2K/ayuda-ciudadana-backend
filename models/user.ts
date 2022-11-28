import { sequelize } from "../lib/db";
import { DataTypes } from "sequelize";

export const User = sequelize.define("User", {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
