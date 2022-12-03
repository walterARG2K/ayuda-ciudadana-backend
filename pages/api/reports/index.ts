import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllReports, createReport } from "../../../controllers/reports";
import * as yup from "yup";
import { middleware } from "../../../lib/middleware";

type Data = {
  message: any;
};

const bodySchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  image: yup.string().required(),
  lat: yup.number().required(),
  lng: yup.number().required(),
});

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const reports = await getAllReports();
  res.send(reports);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<Data>, userId: number) {
  try {
    const { title, description, image, lat, lng } = await bodySchema.validate(req.body);
    const created = await createReport({ title, description, image, lat, lng }, userId);
    res.status(200).json({ message: created });
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

function handleOptions(req: NextApiRequest, res: NextApiResponse) {
  res.send(200);
}

const handler = methods({
  get: handleGet,
  post: middleware(handlePost),
  options: handleOptions,
});

export default handler;
