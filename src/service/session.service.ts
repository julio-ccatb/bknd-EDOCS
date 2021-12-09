import config from 'config';
import { get } from 'lodash';
import { findUser } from './user.service';
import { singJWT, verifyJWT } from '../utils/jwt.utils';
import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel, { SessionDocument } from '../models/session.model';

export const createSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
};

export const findSession = async (query: FilterQuery<SessionDocument>) => {
  return await SessionModel.find(query).lean();
};

export const updateSession = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => {
  return SessionModel.updateOne(query, update, { new: true }).lean();
};

export const reIssueAccesToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJWT(refreshToken);

  if (!decoded || get(decoded, 'session')) return false;

  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = singJWT(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') }
  );
  return accessToken;
};
