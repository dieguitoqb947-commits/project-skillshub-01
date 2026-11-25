import dotenv from 'dotenv';
import { ERROR_MESSAGES } from '../utils/constants.js';

dotenv.config();

const required = (name: string): string => {
  const value = process.env[name]?.trim();

  if (!value) {
    console.error(ERROR_MESSAGES.missingEnv(name));
    process.exit(1);
  }

  return value;
};

const port = Number(required('PORT'));

if (!Number.isInteger(port) || port <= 0) {
  console.error(ERROR_MESSAGES.invalidPort);
  process.exit(1);
}

export const env = {
  port,
  mongodbUri: required('MONGODB_URI'),
  jwtSecret: required('JWT_SECRET'),
  clientOrigin: required('CLIENT_ORIGIN'),
  nodeEnv: process.env.NODE_ENV || 'development',
};
