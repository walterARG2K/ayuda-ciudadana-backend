import { NextApiRequest, NextApiResponse } from "next";
import { deleteAReport, getAReport, updateAReport } from "../../../controllers/reports";
import methods from "micro-method-router";
import * as yup from "yup";
import { middleware } from "../../../lib/middleware";

type Data = {
  message: any;
};

const bodySchema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  image: yup.string(),
  status: yup.string(),
  lat: yup.number(),
  lng: yup.number(),
});

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { reportId } = req.query;
  const reportIdNmbr = Number(reportId);
  const response = await getAReport(reportIdNmbr);
  res.send(response);
}

// userId se consigue mediante authMiddleware
async function handleUpdate(req: NextApiRequest, res: NextApiResponse<Data>, userId: number) {
  try {
    const { reportId } = req.query;
    const reportIdNmbr = Number(reportId);
    const dataToUpdate = await bodySchema.validate(req.body);
    const updatedReport = await updateAReport(reportIdNmbr, dataToUpdate, userId);
    res.json({ message: updatedReport });
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

// auth middleware
async function handleDelete(req: NextApiRequest, res: NextApiResponse, userId: number) {
  const { reportId } = req.query;
  const reportIdNumber = Number(reportId);
  const deleted = await deleteAReport(reportIdNumber, userId);
  res.send(deleted);
}

function handleOptions(req: NextApiRequest, res: NextApiResponse) {
  res.send(200);
}

const handler = methods({
  get: middleware(handleGet),
  put: middleware(handleUpdate),
  delete: middleware(handleDelete),
  options: middleware(handleOptions),
});
export default handler;
