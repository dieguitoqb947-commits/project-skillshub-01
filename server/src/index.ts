import { env } from './config/env.js';
import app from './app.js';
import connectDB from './config/db.js';

try {
  await connectDB();
} catch {
  process.exit(1);
}

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});
