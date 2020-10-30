import { User } from "src/entity/user.entity";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
