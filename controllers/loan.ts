//@ts-nocheck
import { loanModel } from "../models/loan";
import * as Sentry from "@sentry/node";

class LoanController {
  loan = loanModel;

  constructor() {}

  async getActiveLoansByPatronId(patronId: String) {
    try {
      const activeLoans = await this.loan.find({
        patronId: patronId,
        isReturned: false,
      });
      if (activeLoans == []) {
        return { status: "No active loans under the provided patron id" };
      }
      return activeLoans;
    } catch (error) {
      Sentry.captureException(error.message);
      return { error: error.message };
    }
  }

  async getCountOfActiveLoansByPatronId(patronId: String) {
    try {
      const countOfLoans = await this.loan.count({
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
  }

  async getOverdueStatusByPatronId(patronId: String) {
    try {
      const currentDate = new Date();
      const findOverdueBook = await this.loan.findOne({
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
  }

  async getAllOverdueBooks() {
    try {
      const currentDate = new Date();
      const findOverdueBooks = await this.loan.find({
        endTime: { $lt: currentDate },
      });
      return findOverdueBooks;
    } catch (error) {
      Sentry.captureException(error.message);
      return { error: error.message };
    }
  }

  async getLoanAvailability(bookId: String) {
    try {
      const bookAvailability = await this.loan.findOne({
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
  }

  async requestBookLoan(bookId: String, patronId: String) {
    try {
      const currentDate = new Date();
      const dateInTwoWeeks = new Date(currentDate);
      dateInTwoWeeks.setDate(currentDate.getDate() + 14);
      const requestBookLoan = new this.loan({
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
  }

  async returnBookLoan(bookId: String, patronId: String) {
    const query = { bookId: bookId, patronId: patronId };
    try {
      const returnedBook = await this.loan.findOneAndUpdate(query, {
        $set: { isReturned: true },
      });
      if (returnedBook == null) {
        return { error: "Unable to locate the book loan" };
      }
      return returnedBook;
    } catch (error) {
      Sentry.captureException(error.message);
      return { error: error.message };
    }
  }
}

export { LoanController };
