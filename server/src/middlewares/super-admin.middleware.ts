import { Request, Response, NextFunction } from "express";
import { UserRoles } from "../entity/user.entity";

export const superAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  if (user.role === UserRoles.SUPER_ADMIN) {
    next();
  }

  res.status(401).send("Unauthorized");
};
