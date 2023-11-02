import express from "express";
import { LibrarianController, Librarian } from "../controllers/librarian";
import { Patron, PatronController } from "../controllers/patron";

const adminRoute = express.Router();
adminRoute.use(express.json());

const lib = new LibrarianController();
const pat = new PatronController();

adminRoute.get("/librarians", async (req, res) => {
  const returnedLibrarians = await lib.getLibrarians();
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

adminRoute.post("/librarian", async (req, res) => {
  const newLibrarian = new Librarian(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
  );
  const addLibrarian = await lib.createLibrarian(newLibrarian);
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

adminRoute.get("/patrons", async (req, res) => {
  const returnedPatrons = await pat.getPatrons();
  if (returnedPatrons.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Failed to get all patrons",
      returnedPatrons,
    });
  } else {
    res.status(200).json({
      status: "Successfully retrieved all patrons",
      returnedPatrons,
    });
  }
});

adminRoute.post("/patron", async (req, res) => {
  const newPatron = new Patron(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
  );
  const addPatron = await pat.createPatron(newPatron);
  if (addPatron.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Failed to add a new patron",
      addPatron,
    });
  } else {
    res.status(200).json({
      status: "Successfully added a new patron",
      addPatron,
    });
  }
});

export { adminRoute };
