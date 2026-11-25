import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';
import routes from './routes/index.js';
import connectDB from './config/db.js';

const app = express();
app.set('trust proxy', 1);

app.use(cors({ origin: env.clientOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, _res, next) => {
  if (req.path === '/health') {
    next();
    return;
  }

  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use(routes);

app.use(notFound);
app.use(errorHandler);

export default app;
