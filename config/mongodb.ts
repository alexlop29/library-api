import { MONGO_DB_URI } from './environment';

// NOTE: (alopez) Lack of documentation on dynamic imports; Update in a future release.
const mongoose = require('mongoose');

// NOTE: (alopez) Consider using Sentry to track errors in connecting to the database.
try {
  const conn = mongoose.connect(MONGO_DB_URI);
} 
catch (error) {
  process.exit(1);
}

export { mongoose }
