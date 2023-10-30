//@ts-nocheck
import express from "express";
import * as Sentry from "@sentry/node";
import { LoanController } from "../controllers/loan";
import { PatronController } from "../controllers/patron";
import { BookController } from "../controllers/book";

const loanRoute = express.Router();
loanRoute.use(express.json());

const loanController = new LoanController();
const patronController = new PatronController();
const bookController = new BookController();

loanRoute.post("/", async (req, res) => {
  const checkPatronExists = await patronController.getPatronById(
    req.body.patronId,
  );
  if (checkPatronExists.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to locate the patron",
      checkPatronExists,
    });
    return;
  }
  const checkOverdueBook = await loanController.getOverdueStatusByPatronId(
    req.body.patronId,
  );
  if (checkOverdueBook.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to take out another loan",
      checkActiveLoans,
    });
    return;
  }
  const checkActiveLoans = await loanController.getCountOfActiveLoansByPatronId(
    req.body.patronId,
  );
  if (checkActiveLoans.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to take out another loan",
      checkActiveLoans,
    });
    return;
  }
  const checkBookExists = await bookController.getBookById(req.body.bookId);
  if (checkBookExists.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to locate the book using the provided id",
      checkBookExists,
    });
    return;
  }
  const checkLoanAvailability = await loanController.getLoanAvailability(
    req.body.bookId,
  );
  if (checkLoanAvailability.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to process the book's availability",
      checkLoanAvailability,
    });
    return;
  }
  const startLoan = await loanController.requestBookLoan(
    req.body.bookId,
    req.body.patronId,
  );
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
  const requestBookReturn = await loanController.returnBookLoan(
    req.body.bookId,
    req.body.patronId,
  );
  if (requestBookReturn.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to return the requested item",
      requestBookReturn,
    });
    return;
  }
  res.status(200).json(requestBookReturn);
});

loanRoute.get("/overdue", async (req, res) => {
  const getAllOverdueBooks = await loanController.getAllOverdueBooks();
  if (getAllOverdueBooks.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to retrieve all overdue loans",
      getAllOverdueBooks,
    });
  }
  res.status(200).json(getAllOverdueBooks);
});

loanRoute.get("/:patronId", async (req, res) => {
  const requestActiveLoans = await loanController.getActiveLoansByPatronId(
    req.params.patronId,
  );
  if (requestActiveLoans.hasOwnProperty("error")) {
    res.status(500).json({
      status: "Unable to retrieve active loans",
      requestActiveLoans,
    });
    return;
  }
  res.status(200).json(requestActiveLoans);
});

export { loanRoute };
