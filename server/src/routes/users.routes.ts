import * as Express from "express";
import * as UsersController from "../controllers/users.controller";

const router = Express.Router();

router.get("/", UsersController.getUsers);
router.get("/create", UsersController.createUser);

export default router;
