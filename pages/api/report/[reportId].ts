import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteAReport,
  getAReport,
  updateAReport,
} from "../../../controllers/reports";
import methods from "micro-method-router";

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { reportId } = req.query;
  const reportIdNmbr = Number(reportId);
  const response = await getAReport(reportIdNmbr);
  res.send(response);
}

// userId se consigue mediante authMiddleware
async function handleUpdate(
  req: NextApiRequest,
  res: NextApiResponse,
  userId = 1
) {
  const { reportId } = req.query;
  const { title, description, image, status, lat, lng } = JSON.parse(req.body);
  const reportIdNmbr = Number(reportId);
  const updatedReport = await updateAReport(
    {
      reportId: reportIdNmbr,
      description,
      image,
      status,
    },
    userId
  );
  res.send(updatedReport);
}

// auth middleware
async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse,
  userId = 1
) {
  const { reportId } = req.query;
  const reportIdNumber = Number(reportId);
  const deleted = await deleteAReport(reportIdNumber, userId);
  res.send(deleted);
}

function handleOptions(req: NextApiRequest, res: NextApiResponse) {
  res.send(200);
}

const handler = methods({
  get: handleGet,
  put: handleUpdate,
  delete: handleDelete,
  options: handleOptions,
});
export default handler;
