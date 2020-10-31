import * as Express from "express";
import * as ScrapperController from "../controllers/scrapper.controller";

const router = Express.Router();

router.get("/", ScrapperController.startScraping);
router.get("/analysis", ScrapperController.getLatestAnalysis);

export default router;
