import * as Express from "express";
import { initializeAnalysis } from "../services/scrapper";
import { Analysis } from "../models/analysis.model";
import { logger } from "../utils/logger";

export const startScraping = async (
  _req: Express.Request,
  res: Express.Response
) => {
  try {
    logger("Initializing the analysis", "info");

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
  // logger("Getting analytics", "info");

  try {
    const latestAnalytics = await Analysis.find()
      .sort({
        createdAt: "desc",
      })
      .limit(1);

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
