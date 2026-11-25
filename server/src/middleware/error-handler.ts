import type { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../utils/constants.js";

export const errorHandler = (
  err: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  void _next;

  console.error(err);

  let { statusCode = 500 } = err;


  if (err.name === "ValidationError" || err.name === "CastError") {
    statusCode = 400;
  }


  const message =
    statusCode === 500 ? ERROR_MESSAGES.serverError : err.message;

  res.status(statusCode).json({ message });
};