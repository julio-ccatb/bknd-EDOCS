import { sign, SignOptions, verify } from "jsonwebtoken";
import config from "config";
import logger from "./logger";

export const singJWT = (object: Object, options?: SignOptions | undefined) => {
  try {
    const privateKey = config.get<string>("privateKey").trim();
    logger.info(privateKey);

    const token = sign(object, privateKey, {
      ...(options && options),
      algorithm: "RS256",
    });

    logger.info(token);

    return token;
  } catch (e) {
    logger.error(e);
  }
};

// export const verifyJWT = (token: string) => {
//   const { publicKey } = config;
//   try {
//     const decoded = verify(token, publicKey);
//     return {
//       valid: true,
//       expired: false,
//       decoded,
//     };
//   } catch (e: any) {
//     return {
//       valid: false,
//       expired: e.message === "jwt expired",
//       decoded: null,
//     };
//   }
// };
