import * as Express from "express";
import * as ScrapperController from "../controllers/scrapper.controller";
import * as passport from "passport";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  adminMiddleware,
  ScrapperController.startScraping
);
router.get("/analysis", ScrapperController.getLatestAnalysis);

export default router;
