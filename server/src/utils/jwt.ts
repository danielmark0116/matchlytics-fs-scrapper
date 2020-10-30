import * as jwt from "jsonwebtoken";

export const generateJWTToken = (userId: string): string => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 24 * 30 * 9 }
  ); // in seconds
};
