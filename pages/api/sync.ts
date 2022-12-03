import type { NextApiRequest, NextApiResponse } from "next";
import { Auth, User, Report } from "../../models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    User.sync({ force: true });
    Auth.sync({ force: true });
    Report.sync({ force: true });
  } catch (error) {
    throw error;
  }

  res.status(200).send("ok");
}
