import * as Express from "express";
import * as UsersController from "../controllers/users.controller";
import * as passport from "passport";

const router = Express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  UsersController.getUser
);
router.get("/create", UsersController.createUser);

export default router;
