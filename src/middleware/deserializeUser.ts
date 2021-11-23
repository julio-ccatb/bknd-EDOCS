import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccesToken } from "../service/session.service";
import { verifyJWT } from "../utils/jwt.utils";
import logger from "../utils/logger";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get Access and Refresh tokens from headers
  const header = get(req, "headers.authorization", "");
  const accessToken = header.replace(/^Bearer\s/, "");
  const refreshToken = get(req, "headers.x-refresh", "");

  if (!accessToken) return next();

  const { decoded, expired } = verifyJWT(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccesToken({ refreshToken });
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      const { decoded } = verifyJWT(newAccessToken);
      res.locals.user = decoded;

      return next();
    }
    return next();
  }
  next();
};
