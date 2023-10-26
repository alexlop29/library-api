import dotenv from 'dotenv';
dotenv.config();

export const EXPRESS_PORT = process.env.EXPRESS_PORT;
export const MONGO_DB_URI = process.env.MONGO_DB_URI ?? '';
