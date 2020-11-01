import * as Express from "express";
import { generateJWTToken } from "../../src/utils/jwt";

export const handleOAuthRedirect = (
  req: Express.Request,
  res: Express.Response
) => {
  const { OAUTH_REDIRECT } = process.env;
  const token = generateJWTToken(req?.user?.id ?? "");

  res.redirect(OAUTH_REDIRECT + "?token=" + token);
};

export const oauthRedirect = (req: Express.Request, res: Express.Response) => {
  console.log(req.query);
  res.status(200).type("text/html").send("");
};
