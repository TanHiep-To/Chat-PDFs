import { RedisClient } from "../config/redis";

export const setVerificationCode = async (code: string, expiresIn: number) => {
  return await RedisClient.setEx(`user:verification-otp`, expiresIn, code);
};

export const getVerificationCode = async () => {
  return await RedisClient.get(`user:verification-otp`);
};

export const deleteVerificationCode = async () => {
  return await RedisClient.del(`user:verification-otp`);
};
