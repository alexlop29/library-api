import dotenv from "dotenv";
dotenv.config();

export const ENVIRONMENT = process.env.ENVIRONMENT;
export const EXPRESS_PORT = process.env.EXPRESS_PORT;
export const MONGO_DB_URI =
  ENVIRONMENT == "DEV"
    ? process.env.MONGO_DB_DEV_URI
    : process.env.MONGO_DB_TEST_URI;
export const SENTRY_DSN = process.env.SENTRY_DSN;
