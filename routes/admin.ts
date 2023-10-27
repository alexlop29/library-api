import express from "express";
import { librarianModel } from "../models/librarian";
// import { patronModel } from "../models/patron";
import * as Sentry from "@sentry/node";

type librarian = {
  firstName: String;
  lastName: String;
  email: String;
};

// type patron = {
//   firstName: String;
//   lastName: String;
//   email: String;
//   status: Boolean;
// };

const adminRoute = express.Router();
adminRoute.use(express.json());

const librarian = librarianModel;
// const patron = patronModel;

const createLibrarian = async (librarianInfo: librarian) => {
  try {
    let newLibrarian = new librarian({
      firstName: librarianInfo.firstName,
      lastName: librarianInfo.lastName,
      email: librarianInfo.email,
    });
    await newLibrarian.save();
    return newLibrarian;
  } catch {
    return { error: "Unable to add a new librarian" };
  }
};

adminRoute.post("/librarian", async (req, res) => {
  const librarianInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };
  const addLibrarian = await createLibrarian(librarianInfo);
  if (!addLibrarian) {
    res.status(500).json({ error: "Unable to add a new librarian" });
    Sentry.captureMessage("error: 'Unable to add a new librarian'");
  }
  res.status(200).json({ status: "Successfully added librarian" });
});

export { adminRoute };
