import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getUserReports } from "../../../controllers/reports";

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse,
  userId = 1
) {
  const result = await getUserReports(userId);
  res.send(result);
}

async function handleOptions(req: NextApiRequest, res: NextApiResponse) {
  res.send(200);
}

const handler = methods({
  get: handleGet,
  options: handleOptions,
});

export default handler;
