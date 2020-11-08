import { Request, Response, NextFunction } from "express";
import { UserRoles } from "../entity/user.entity";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  const isAdmin = user.role === UserRoles.ADMIN;
  const isSuperAdmin = user.role === UserRoles.SUPER_ADMIN;

  if (isAdmin || isSuperAdmin) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
