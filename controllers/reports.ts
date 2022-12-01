import { Report } from "../models";
import placeholder from "../public/placeholder.png";

export async function getAllReports() {
  try {
    const reports = await Report.findAll({ raw: true });
    return reports;
  } catch (error) {
    console.log({ error });
    return { error };
  }
}

export async function getUserReports(userId: number) {
  const userReports = await Report.findAll({ where: { UserId: userId } });
  return userReports;
}

export async function getAReport(reportId: number) {
  try {
    const report = await Report.findByPk(reportId);
    return report;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

type reportProps = {
  title: string;
  description: string;
  image: string;
  reportId?: number;
  status?: string;
  lat: number;
  lng: number;
};

type updateReportProps = {
  title?: string;
  description: string;
  image: string;
  reportId?: number;
  status?: string;
  lat?: number;
  lng?: number;
};

export async function createReport(body: reportProps, userId: number) {
  try {
    if (userId) {
      const { title, description, image, lat, lng } = body;
      const newReport = await Report.create({
        title,
        description,
        image: image || placeholder,
        status: "waiting",
        UserId: userId,
        latitude: lat,
        longitude: lng,
      });
      return newReport;
    }
  } catch (error) {
    console.log({ error });
    return error;
  }
}

export async function updateAReport(body: updateReportProps, userId: number) {
  try {
    const report = await Report.findByPk(body.reportId);
    const newReport = report?.dataValues;
    if (newReport.UserId == userId) {
      const updateReport = await report?.update({
        description: body.description || newReport.description,
        image: body.image || newReport.image,
        status: body.status || newReport.status,
      });

      return updateReport;
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
}

export async function deleteAReport(reportId: number, userId: number) {
  const report = await Report.findByPk(reportId);
  const newReport = report?.dataValues;
  if (newReport.UserId == userId) {
    await Report.destroy({
      where: { id: reportId },
    });
    return true;
  }
}
