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

// adminRoute.post("/librarian", async (req, res) => {
//   const librarianInfo = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//   };
//   console.log(librarianInfo);
//   const addLibrarian = await createLibrarian(librarianInfo);
//   if (addLibrarian.hasOwnProperty("error")) {
//     res.status(500).json({
//       status: "Unable to add librarian",
//       message: addLibrarian,
//     });
//   }
//   res.status(200).json({
//     status: "Successfully added librarian",
//     message: addLibrarian,
//   });
// });

adminRoute.post("/librarian", async (req, res) => {
  const addLibrarian = await createLibrarian(req);
  if (addLibrarian.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to add a new librarian",
      addLibrarian,
    });
  } else {
    res.status(200).json({
      status: "Successfully added a new librarian",
      addLibrarian,
    })
  };
});

export { adminRoute };
