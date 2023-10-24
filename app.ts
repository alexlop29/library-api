/*
NOTE TO SELF: Reminder to update.
*/

import express from "express";

const app = express();
const EXPRESS_PORT = 3000;

// Sample Route
app.get("/", (_req, res) => {
  res.send("Hi Alex");
});

app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on http://localhost:${EXPRESS_PORT}`);
});

export { app };
