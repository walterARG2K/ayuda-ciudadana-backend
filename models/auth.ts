import { sequelize } from "./connection";
import { DataTypes } from "sequelize";

export const Auth = sequelize.define(
  "Auth",
  {
    email: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.INTEGER,
    },
    expiration: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "Auth",
  }
);
