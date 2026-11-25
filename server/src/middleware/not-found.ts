import type { Request, Response } from "express";
import { ERROR_MESSAGES } from "../utils/constants.js";

export const notFound = (req: Request, res: Response): void => {
   res.status(404).json({
     success: false,
     data: null,
     error: { message: ERROR_MESSAGES.notFound(req.method, req.originalUrl) }
   });
};
