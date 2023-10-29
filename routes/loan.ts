//@ts-nocheck
import express from "express";
import { loanModel } from "../models/loan";
import { bookModel } from "../models/book";
import { patronModel } from "../models/patron";
import * as Sentry from "@sentry/node";

const loanRoute = express.Router();
loanRoute.use(express.json());

const loan = loanModel;
const book = bookModel;
const patron = patronModel;

const confirmBookExists = async (bookId: String) => {
  try {
    const LocatedBook = await book.findOne({ _id: bookId });
    if (!LocatedBook) {
      return { error: "Book not found" };
    }
    return LocatedBook;
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

// Consider considating if exists in patron / admin routes

// are these functions even needed with mongodb embedded schemas (?)
// confirm

const confirmPatronExists = async (patronId: String) => {
  try {
    const LocatedPatron = await patron.findOne({ _id: patronId });
    if (!LocatedPatron) {
      return { error: "Patron not found" };
    }
    return LocatedPatron;
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

const checkNumberOfActiveLoans = async (patronId: String) => {
  try {
    const countOfLoans = await loan.count({
      patronId: patronId,
      isReturned: true,
    });
    if (countOfLoans > 3) {
      return { error: "Too many active loans" };
    }
    return countOfLoans;
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

const checkOverdueStatus = async (patronId: String) => {
  try {
    const currentDate = new Date();
    const findOverdueBook = await loan.findOne({
      patronId: patronId,
      endTime: { $lt: currentDate },
    });
    if (findOverdueBook != null) {
      return { error: "Located an overdue book" };
    }
    return { status: "No overdue books" };
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

const confirmLoanAvailability = async (bookId: String) => {
  try {
    const bookAvailability = await loan.findOne({
      bookId: bookId,
      isReturned: false,
    });
    if (bookAvailability != null) {
      return { error: "Book is unavailable" };
    }
    return { status: "The requested book is available" };
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

const processBookLoan = async (bookId: String, patronId: String) => {
  try {
    const currentDate = new Date();
    const dateInTwoWeeks = new Date(currentDate);
    dateInTwoWeeks.setDate(currentDate.getDate() + 14);
    const requestBookLoan = new loan({
      startTime: currentDate,
      endTime: dateInTwoWeeks,
      bookId: bookId,
      patronId: patronId,
      isReturned: false,
    });
    await requestBookLoan.save();
    return requestBookLoan;
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

const returnBook = async (bookId: String, patronId: String) => {
  const query = { bookId: bookId, patronId: patronId };
  try {
    const returnedBook = loan.findOne(query, { isReturned: true });
    if (returnedBook == null) {
      return { error: "Unable to locate the book loan" };
    }
    return returnedBook;
  } catch (error) {
    Sentry.captureException(error.message);
    return { error: error.message };
  }
};

/*
NOTE: (alopez) While improving error handling, add status 404 when the book
does not exist.
*/

//check what happens in all routes if you do not enter any information; May need
// try..catch
// chain async awaits!
// extract error handling!

// use type to confirm all necessary parameters are passed by the user
loanRoute.post("/", async (req, res) => {
  const checkPatronExists = await confirmPatronExists(req.body.patronId);
  if (checkPatronExists.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to locate the patron",
      checkPatronExists,
    });
    return;
  }
  const checkOverdueBook = await checkOverdueStatus(req.body.patronId);
  if (checkOverdueBook.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to take out another loan",
      checkActiveLoans,
    });
    return;
  }
  const checkActiveLoans = await checkNumberOfActiveLoans(req.body.patronId);
  if (checkActiveLoans.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to take out another loan",
      checkActiveLoans,
    });
    return;
  }
  const checkBookExists = await confirmBookExists(req.body.bookId);
  if (checkBookExists.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to locate the book using the provided id",
      checkBookExists,
    });
    return;
  }
  const checkLoanAvailability = await confirmLoanAvailability(req.body.bookId);
  if (checkLoanAvailability.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to process the book's availability",
      checkLoanAvailability,
    });
    return;
  }
  const startLoan = await processBookLoan(req.body.bookId, req.body.patronId);
  if (startLoan.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to loan the requested item",
      startLoan,
    });
    return;
  }
  res.status(200).json(startLoan);
});

loanRoute.post("/return", async (req, res) => {
  const requestBookReturn = await returnBook(
    req.body.bookId,
    req.body.patronId,
  );
  if (requestBookReturn.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to loan the requested item",
      requestBookReturn,
    });
    return;
  }
  res.status(200).json(requestBookReturn);
});

export { loanRoute };
