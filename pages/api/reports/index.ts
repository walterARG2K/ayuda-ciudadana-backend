import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllReports, createReport } from "../../../controllers/reports";

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const reports = await getAllReports();
  res.send(reports);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { title, description, image, lat, lng } = JSON.parse(req.body);
  const latNmbr = Number(lat);
  const lngNmr = Number(lng);
  const userId = 1;
  const created = await createReport(
    { title, description, image, lat: latNmbr, lng: lngNmr },
    userId
  );
  res.send(created);
}

function handleOptions(req: NextApiRequest, res: NextApiResponse) {
  res.send(200);
}

const handler = methods({
  get: handleGet,
  post: handlePost,
  options: handleOptions,
});

export default handler;
