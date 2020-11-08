import * as Express from "express";
import * as ScrapperController from "../controllers/scrapper.controller";
import * as passport from "passport";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { memberMiddleware } from "../middlewares/member.middleware";

const router = Express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  adminMiddleware,
  ScrapperController.startScraping
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  memberMiddleware,
  ScrapperController.getLatestAnalysis
);

export default router;
