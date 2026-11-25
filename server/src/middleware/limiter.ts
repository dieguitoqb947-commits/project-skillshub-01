import { rateLimit } from "express-rate-limit";
import { ERROR_MESSAGES, LIMITS } from "../utils/constants.js";

export const loginLimiter = rateLimit({
    windowMs: LIMITS.loginWindowMs,
    limit: LIMITS.loginMaxAttempts,
    message: ERROR_MESSAGES.tooManyLogins,
});

export const registerLimiter =  rateLimit({
    windowMs: LIMITS.registerWindowMs,
    limit: LIMITS.registerMaxAttempts,
    message: ERROR_MESSAGES.tooManySignups,
})