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

const createLibrarian = async (req) => {
  try {
    let newLibrarian = new librarian({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });
    await newLibrarian.save();
    return newLibrarian;
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

const getLibrarians = async () => {
  try {
    let allLibrarians = await librarian.find({});
    return allLibrarians;
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

adminRoute.get("/librarians", async (req, res) => {
    const returnedLibrarians = await getLibrarians();
    if (returnedLibrarians.hasOwnProperty("error")) {
      res.status(500).json({
        status: "Failed to get all librarians",
        returnedLibrarians,
      });
    } else {
      res.status(200).json({
        status: "Successfully retrieved all librarians",
        returnedLibrarians,
      });
    }
  });

/*
Consider improving error handling by querying for a `validation` to
return a 400 error.
*/
adminRoute.post("/librarian", async (req, res) => {
  const addLibrarian = await createLibrarian(req);
  if (addLibrarian.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Failed to add a new librarian",
      addLibrarian,
    });
  } else {
    res.status(200).json({
      status: "Successfully added a new librarian",
      addLibrarian,
    });
  }
});

export { adminRoute };
