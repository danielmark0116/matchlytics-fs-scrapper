import * as Express from "express";
import { generateJWTToken } from "../../src/utils/jwt";

export const handleOAuthRedirect = (
  req: Express.Request,
  res: Express.Response
) => {
  const token = generateJWTToken(req?.user?.id ?? "");

  res.redirect("/auth/oauth_redirect?token=" + token);
};

export const oauthRedirect = (req: Express.Request, res: Express.Response) => {
  console.log(req.query);
  res.status(200).type("text/html").send("");
};
