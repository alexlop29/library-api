//@ts-nocheck

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
    Sentry.captureMessage("error: 'Unable to add a new librarian'");
    return { error: "Unable to add a new librarian" };
  }
};

adminRoute.get("/librarians"),
  async (req, res) => {
    try {
      const getLibrarians = await librarian.find({});
      res.status(200).json({ librarians: getLibrarians });
    } catch (error) {
      Sentry.captureMessage("error: 'Unable to get librarians'");
      res.status(500).json({ message: "unable to get librarians" });
    }
  };

adminRoute.post("/librarian", async (req, res) => {
  const librarianInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };
  const addLibrarian = await createLibrarian(librarianInfo);
  res.status(200).json({ status: "Successfully added librarian" });
});

export { adminRoute };
