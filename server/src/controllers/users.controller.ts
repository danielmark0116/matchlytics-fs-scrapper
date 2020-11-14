import * as Express from "express";
import { getRepository } from "typeorm";
import { User, UserRoles } from "../entity/user.entity";

export const getUser = async (req: Express.Request, res: Express.Response) => {
  if (!req.user) {
    throw new Error("No user");
  }

  try {
    res.json({
      success: true,
      error: false,
      user: req.user,
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      success: false,
      msg: "Could not get current user",
    });
  }
};

export const getUsers = async (
  _req: Express.Request,
  res: Express.Response
) => {
  try {
    const users = await getRepository(User).find();

    res.json({
      users,
      success: true,
      error: false,
      msg: "Fetched all users",
    });
  } catch (e) {
    res.status(400).json({
      msg: "Get all users error",
      error: true,
      success: false,
      errorData: e,
    });
  }
};

export const changeRole = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const { role: newRole, user_id } = req.params;

    if (
      !Object.values(UserRoles).includes(newRole.toLowerCase() as UserRoles)
    ) {
      throw new Error("No such role available");
    }

    if (newRole === UserRoles.SUPER_ADMIN) {
      throw new Error("Could not grant super_admin role to anyone");
    }

    await getRepository(User).update(user_id ?? "", { role: newRole });

    const user = await getRepository(User).findOne(user_id ?? "");

    console.log({ user });

    res.status(200).json({
      user,
      success: true,
      error: false,
      msg: "Updated user",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      msg: "Create user error",
      error: true,
      success: false,
      errorData: e,
    });
  }
};
