import { MONGO_DB_URI } from "./environment";
const mongoose = require("mongoose");

try {
  mongoose.connect(MONGO_DB_URI);
} catch (error) {
  process.exit(1);
}

export { mongoose };
