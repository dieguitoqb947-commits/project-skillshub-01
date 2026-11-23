import mongoose from 'mongoose';
import { env } from './env.js';

const connectDB = async () => {
  try {
    await mongoose.connect(env.mongodbUri, { maxPoolSize: 10 });
    console.log('Conectado a MongoDB');
  } catch {
    console.error('Error de conexión a MongoDB');
    process.exit(1);
  }
};

export default connectDB;
