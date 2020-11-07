import { Request, Response, NextFunction } from "express";
import { UserRoles } from "../entity/user.entity";

export const memberMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  const isMember = user.role === UserRoles.MEMBER;
  const isAdmin = user.role === UserRoles.ADMIN;
  const isSuperAdmin = user.role === UserRoles.SUPER_ADMIN;

  if (isAdmin || isSuperAdmin || isMember) {
    next();
  }

  res.status(401).send("Unauthorized");
};
