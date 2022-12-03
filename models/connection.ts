import { Sequelize } from "sequelize";
import * as pg from "pg";

export const sequelize = new Sequelize(process.env.POSTGRE_DATABASE as string, {
  dialectModule: pg,
});
