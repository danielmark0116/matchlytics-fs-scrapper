import * as Express from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";

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

export const createUser = async (
  _req: Express.Request,
  res: Express.Response
) => {
  try {
    const newUser = getRepository(User).create({
      email: "mail2@mail.com",
      name: "JHohn DOe",
      password_hash: "sdiof",
    });

    const output = await getRepository(User).save(newUser);

    res.status(201).json({
      user: output,
      success: true,
      error: false,
      msg: "Created new user",
    });
  } catch (e) {
    res.status(400).json({
      msg: "Create user error",
      error: true,
      success: false,
      errorData: e,
    });
  }
};
