import type { NextApiRequest, NextApiResponse } from "next";
import Method from "micro-method-router";
import { middleware } from "../../../lib/middleware";
import { getUserReports } from "../../../controllers/reports";

type Data = {
  message: any;
};

const get = async (req: NextApiRequest, res: NextApiResponse<Data>, userId: number) => {
  try {
    const response = await getUserReports(userId);
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

function options(req: NextApiRequest, res: NextApiResponse) {
  res.send(200);
}

export default Method({ get: middleware(get), options });
