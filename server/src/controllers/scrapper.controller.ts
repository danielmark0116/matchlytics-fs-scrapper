import * as Express from "express";
import { initializeAnalysis } from "../services/scrapper";
import { Analysis } from "../models/analysis.model";
import * as path from "path";

export const startScraping = async (
  _req: Express.Request,
  res: Express.Response
) => {
  try {
    console.log(path.dirname(__dirname));
    console.log("initializign analysis");

    initializeAnalysis(400, 20);

    res.json({
      success: true,
      error: false,
      msg: "Started scrapping",
    });
  } catch (e) {
    res.status(400).json({
      msg: "Scrapper start error",
      error: true,
      success: false,
      errorData: e,
    });
  }
};

export const getLatestAnalysis = async (
  _req: Express.Request,
  res: Express.Response
) => {
  console.log("getting analytics");
  try {
    const latestAnalytics = await Analysis.find()
      .sort({
        createdAt: "desc",
      })
      .limit(1);

    //   const analyticsRootPath = "./client/src/analytics";

    //   if (!fs.existsSync(analyticsRootPath)) {
    //     fs.mkdirSync(analyticsRootPath);
    //     fs.unlinkSync("./client/src/analytics/analytics.txt");
    //   }
    //   fs.writeFileSync(
    //     "./client/src/analytics/analytics.txt",
    //     JSON.stringify(latestAnalytics)
    //   );

    res.json({
      msg: "Fetched anaytics",
      data: latestAnalytics,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      msg: "Error with fetching analytics",
      error: e.message,
    });
  }
};
