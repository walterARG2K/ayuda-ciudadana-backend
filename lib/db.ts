import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("ayuda_ciudadana", "root", "toro1245", {
  host: "127.0.0.1",
  dialect: "mysql",
  port: 3306,
});
