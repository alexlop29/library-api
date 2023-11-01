//@ts-nocheck
import { patronModel } from "../models/patron";
import { mongoose } from "../config/mongodb";

const fakePatronWithLoans = {
  firstName: "Jelly",
  lastName: "Beans",
  email: "jellybeans@gmail.com",
  status: true,
};

module.exports = async function (globalConfig, projectConfig) {
  console.log(`hi alex`);
  await mongoose.connection.dropCollection("patrons");
  const patronInfo = patronModel(fakePatronWithLoans);
  await patronInfo.save();
  console.log(patronInfo);
};
