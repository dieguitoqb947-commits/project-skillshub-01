import mongoose from 'mongoose';
import { env } from './env.js';

let connection: Promise<typeof mongoose> | null = null;

const connectDB = () => {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose);
  }

  if (!connection) {
    connection = mongoose
      .connect(env.mongodbUri, { maxPoolSize: 10 })
      .then((mongooseInstance) => {
        console.log('Conectado a MongoDB');
        return mongooseInstance;
      })
      .catch((error: unknown) => {
        connection = null;
        console.error('Error de conexión a MongoDB');
        throw error;
      });
  }

  return connection;
};

export default connectDB;
