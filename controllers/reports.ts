import { Report, User } from "../models";

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
  description?: string;
  image?: string;
  status?: string;
  lat?: number;
  lng?: number;
};

//
export async function getAllReports() {
  try {
    const reports = await Report.findAll({ raw: true });
    return reports;
  } catch (error) {
    throw error;
  }
}

//
export async function getUserReports(userId: number) {
  try {
    const userReports = await Report.findAll({ where: { UserId: userId } });
    return userReports;
  } catch (error) {
    throw error;
  }
}

//
export async function getAReport(reportId: number) {
  try {
    const report = await Report.findByPk(reportId);
    return report;
  } catch (error) {
    throw error;
  }
}

//
export async function createReport(body: reportProps, userId: number) {
  try {
    if (userId) {
      const { title, description, image, lat, lng } = body;
      const newReport = await Report.create({
        title,
        description,
        image: image,
        status: "waiting",
        UserId: userId,
        latitude: lat,
        longitude: lng,
      });
      return newReport;
    }
  } catch (error) {
    throw error;
  }
}

//
export async function updateAReport(reportId: number, body: updateReportProps, userId: number) {
  try {
    const report = await Report.findByPk(reportId);
    const newReport = report?.dataValues;
    if (newReport.UserId == userId) {
      const updateReport = await report?.update(body);
      return updateReport;
    }
  } catch (error) {
    throw error;
  }
}

//
export async function deleteAReport(reportId: number, userId: number) {
  try {
    const report = await Report.findByPk(reportId);
    const newReport = report?.dataValues;
    if (newReport.UserId == userId) {
      await Report.destroy({
        where: { id: reportId },
      });
      return true;
    }
  } catch (error) {
    throw error;
  }
}
