import { Request, Response } from "express";
import { createSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { singJWT } from "../utils/jwt.utils";
import config from "../../config/default";

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

  const accesToken = singJWT(
    { ...user, session: session._id },
    { expiresIn: config.accesTokenTtl }
  );

  console.log(accesToken);
  // Create refresh token

  // const refreshToken = singJWT(
  //   { ...user, session: session._id },
  //   { expiresIn: config.refreshTokenTtl }
  // );

  // Return

  return res.status(200).send({ accesToken });
};
