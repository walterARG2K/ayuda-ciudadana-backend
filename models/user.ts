import { sequelize } from "./connection";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
  "User",
  {
    full_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "User",
  }
);
