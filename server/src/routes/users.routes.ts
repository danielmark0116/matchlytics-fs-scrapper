import * as Express from "express";
import * as UsersController from "../controllers/users.controller";
import * as passport from "passport";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  UsersController.getUser
);
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  adminMiddleware,
  UsersController.getUsers
);
router.patch(
  "/:user_id/role/:role",
  passport.authenticate("jwt", { session: false }),
  adminMiddleware,
  UsersController.changeRole
);

export default router;
