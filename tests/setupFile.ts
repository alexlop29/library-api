import * as mongoose from "mongoose";

beforeAll(async () => {
  const MONGO_URI = process.env["MONGO_URI"] ?? "";
  await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

export { mongoose };
