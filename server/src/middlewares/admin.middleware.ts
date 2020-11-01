import { Request, Response, NextFunction } from "express";
import { UserRoles } from "../entity/user.entity";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  if (user.role === UserRoles.ADMIN) {
    next();
  }

  res.status(401).send("Unauthorized");
};
