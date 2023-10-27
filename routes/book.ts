//@ts-nocheck
import express from "express";
import { bookModel } from "../models/book";
import * as Sentry from "@sentry/node";
import { librarianModel } from "../models/librarian";

const bookRoute = express.Router();
bookRoute.use(express.json());

const book = bookModel;
const librarian = librarianModel;

const createBook = async (isbn, librarianId) => {
  try {
    let newBook = new book({
      isbn: isbn,
      librarianId: librarianId
    });
    await newBook.save();
    return newBook;
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

/*
Confirm error handling works as expected.
*/
const retrieveLibrarianId = async (email: String) => {
  try {
    const searchForLibrarianId = librarian.where({ email: email });
    const locatedLibrarian = await searchForLibrarianId.findOne();
    return locatedLibrarian._id;
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

/*
NOTE: (alopez) Consider improving error handling by querying for a `validation` to
return a 400 error.
*/
bookRoute.post("/", async (req, res) => {
  const getLibrarianCredentials = await retrieveLibrarianId(req.body.email);
  if (getLibrarianCredentials.hasOwnProperty("error")) {
    return res.status(500).json({
      status: "Unable to verify librarian credentials",
      getLibrarianCredentials
    })
  }
  const addBook = await createBook(req.body.isbn, getLibrarianCredentials);
  if (addBook.hasOwnProperty("error")){
    return res.status(500).json({
      status: "Unable to create a new book entry",
      getLibrarianCredentials
    })
  }
  res.status(200).json(addBook)
});

export { bookRoute };
