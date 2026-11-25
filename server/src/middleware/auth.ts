import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ERROR_MESSAGES } from '../utils/constants.js';

export const auth = (req: Request, res: Response, next: NextFunction) => {
   const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: ERROR_MESSAGES.tokenRequired });
    return;
  }

  try {
    const token = authHeader.slice(7);
    const payload = jwt.verify(token, env.jwtSecret) as { userId?: unknown };
    if ( typeof payload.userId !== 'string') {
        res.status(401).json({ message: ERROR_MESSAGES.tokenInvalid });
        return
    }
    req.user = { userId: payload.userId };
    next();

  } catch {
    res.status(401).json({ message: ERROR_MESSAGES.tokenInvalid });
    return;
  }

}