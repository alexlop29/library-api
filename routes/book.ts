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
    const newBook = new book({
      isbn: isbn,
      librarianId: librarianId,
    });
    await newBook.save();
    return newBook;
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

const deleteBook = async (bookId) => {
  try {
    const removeBook = await book.deleteOne({ _id: bookId });
    return removeBook;
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

const retrieveLibrarianId = async (email: string) => {
  try {
    const locatedLibrarian = await librarian.findOne({ email: email });
    if (!locatedLibrarian) {
      return { error: "Librarian not found for the provided email" };
    }
    return locatedLibrarian._id;
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

const getBooks = async () => {
  try {
    const allBooks = await book.find({});
    return allBooks;
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

bookRoute.get("/", async (req, res) => {
  const returnedBooks = await getBooks();
  if (returnedBooks.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Failed to get all books",
      returnedBooks,
    });
  } else {
    res.status(200).json({
      status: "Successfully retrieved all books",
      returnedBooks,
    });
  }
});

/*
NOTE: (alopez) Consider improving error handling by querying for a `validation` to
return a 400 error.
*/
bookRoute.post("/", async (req, res) => {
  const getLibrarianCredentials = await retrieveLibrarianId(req.body.email);
  if (getLibrarianCredentials.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to verify librarian credentials",
      getLibrarianCredentials,
    });
    return;
  }
  const addBook = await createBook(req.body.isbn, getLibrarianCredentials);
  if (addBook.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to create a new book entry",
      addBook,
    });
    return;
  }
  res.status(200).json(addBook);
});

bookRoute.delete("/:bookId", async (req, res) => {
  const removedBook = await deleteBook(req.params.bookId);
  if (removedBook.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to remove book",
      removedBook,
    });
    return;
  }
  res.status(200).json(removedBook);
});

export { bookRoute };
