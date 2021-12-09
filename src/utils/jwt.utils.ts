import { sign, SignOptions, verify } from 'jsonwebtoken';
import config from 'config';
import logger from './logger';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

export const singJWT = (object: Object, options?: SignOptions | undefined) => {
  try {
    const token = sign(object, privateKey, {
      ...(options && options),
      algorithm: 'RS256',
    });

    return token;
  } catch (e) {
    logger.error(e);
  }
};

export const verifyJWT = (token: string) => {
  try {
    const decoded = verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
};
