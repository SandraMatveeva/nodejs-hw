import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
// import crypto from 'node:crypto';
import { createSession, setSessionCookies } from '../services/auth.js';
import { Session } from '../models/session.js';

export const registerUser = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    throw createHttpError(400, 'Email already in use');
  }

  const hashePassword = await bcrypt.hash(req.body.password, 10);
  // console.log(req.body.password, hashePassword);

  const user = await User.create({
    email: req.body.email,
    password: hashePassword,
  });

  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);
  res.status(201).json(user);
};

export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password,
  );
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.deleteOne({
    userId: user._id,
  });

  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);
  // res.status(201).json(user);

  res.status(200).json(user);
};

export const logoutUser = async (req, res) => {
if (req.cookies.sessionId) {
  await Session.deleteOne({_id: req.cookies.sessionId});
}

res.clearCookie("accessToken");
res.clearCookie("refreshToken");
res.clearCookie("sessionId");

res.status(204).send();
};


export const refreshUserSession = async (req, res) => {
  const {sessionId, refreshToken} = req.cookies;

  if (!sessionId || !refreshToken) {
    throw createHttpError(401, "Missing tokens");
  }

  const session = await Session.findOne({
    _id:sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, "Session not found");
  }

const isRefreshTokenExpired = session.refreshTokenValidUntil < new Date ();
if (isRefreshTokenExpired) {
  await session.deleteOne();
  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  throw createHttpError(401, "Session token expired");
}

await session.deleteOne();

const newSession = await createSession(session.userId);
setSessionCookies(res, newSession);

  res.status(200).json({
      message: "Session refreshed",
  });
};
