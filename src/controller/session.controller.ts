import { Request, Response } from "express";
import {
  createSession,
  findSession,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { singJWT } from "../utils/jwt.utils";
import config from "../../config/default";
import logger from "../utils/logger";

export const createSessionHandler = async (req: Request, res: Response) => {
  // Validate Password

  const user = await validatePassword(req.body);

  if (!user)
    return res.status(401).send({ message: "Invalid email or password" });

  // Create session

  const session = await createSession(
    user._id.toString(),
    req.get("user-agent") || ""
  );

  // Create Access Token

  const accessToken = singJWT(
    { ...user, session: session._id },
    { expiresIn: config.accessTokenTtl }
  );

  // Create refresh token

  const refreshToken = singJWT(
    { ...user, session: session._id },
    { expiresIn: config.refreshTokenTtl }
  );

  // Return

  return res.status(200).send({ accessToken, refreshToken });
};

export const getUserSessionHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  const sessions = await findSession({ user: userId, valid: true });
  return res.status(200).send({ sessions });
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
  try {
    const sessionId = res.locals.user.session;
    const state = await updateSession({ _id: sessionId }, { valid: false });
    if (state)
      return res.status(202).send({ accessToken: null, refreshToken: null });
    throw new Error("unable to process");
  } catch (err: any) {
    logger.error(err);
  }
};
