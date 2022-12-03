import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.POSTGRE_DATABASE as string);
