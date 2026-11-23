import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { errorHandler } from './middleware/error-handler.js';
import { createUser, loginUser } from './controllers/users.js';
import { registerLimiter, loginLimiter } from './middleware/limiter.js';



const app = express();
app.set('trust proxy', 1)


app.use(cors({ origin: env.clientOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    data: { status: "OK" },
    error: null,
  })
});

app.post("/signup", registerLimiter, createUser);
app.post("/signin", loginLimiter, loginUser);


app.use(errorHandler)


export default app;
