import { Request, Response, NextFunction } from "express";
import { UserRoles } from "../entity/user.entity";
import { logger } from "../utils/logger";

export const memberMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  console.log("MEMBER MIDDLEWARE");

  const isMember = user.role === UserRoles.MEMBER;
  const isAdmin = user.role === UserRoles.ADMIN;
  const isSuperAdmin = user.role === UserRoles.SUPER_ADMIN;

  if (isAdmin || isSuperAdmin || isMember) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
