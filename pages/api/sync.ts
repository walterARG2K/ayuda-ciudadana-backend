import { sequelize } from "../../lib/db";
import { Report } from "../../models";
import { User } from "../../models";

export default async function handleGet(req: any, res: any) {
  try {
    await Report.sync({ alter: true });
    /*    await Report.sync(); */
    /*  await sequelize.sync({ alter: true }); */
  } catch (error) {
    console.log({ error });
  }
}
