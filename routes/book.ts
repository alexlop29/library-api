//@ts-nocheck
import express from "express";
import * as Sentry from "@sentry/node";

import { LibrarianController } from "../controllers/librarian";
import { BookController, Book } from "../controllers/book";

const bookRoute = express.Router();


bookRoute.use(express.json());

const librarianController = new LibrarianController();
const bookController = new BookController();

bookRoute.get("/", async (req, res) => {
  const returnedBooks = await bookController.getBooks();
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
  const getLibrarianCredentials = await librarianController.retrieveLibrarianId(
    req.body.email,
  );
  if (getLibrarianCredentials.hasOwnProperty("error")) {
    res.status(500).json({
        status: "Unable to verify librarian credentials",
      getLibrarianCredentials,
    });
    return;
  }
  const newBook = new Book(req.body.isbn, getLibrarianCredentials);
  const addBook = await bookController.createBook(newBook);
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
  const removedBook = await bookController.deleteBook(req.params.bookId);
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


