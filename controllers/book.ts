//@ts-nocheck
import { bookModel } from "../models/book";
import * as Sentry from "@sentry/node";

class Book {
  isbn: Number;
  librarianId: String;

  constructor(isbn: Number, librarianId: String) {
    this.isbn = isbn;
    this.librarianId = librarianId;
  }
}

class BookController {
  book = bookModel;

  constructor() {}

  async getBooks() {
    try {
      const allBooks = await this.book.find({});
      return allBooks;
    } catch (error) {
      Sentry.captureException(error.message);
      return { error: error.message };
    }
  }

  async getBookById(bookId: String) {
    try {
      const LocatedBook = await this.book.findOne({ _id: bookId });
      if (!LocatedBook) {
        return { error: "Book not found" };
      }
      return LocatedBook;
    } catch (error) {
      Sentry.captureException(error.message);
      return { error: error.message };
    }
  }

  // Need to add validation in the route to confirm the librarian exists
// prior to creating the book;
  async createBook(book: Book) {
    try {
      const newBook = new this.book({
        isbn: book.isbn,
        librarianId: book.librarianId,
      });
      await newBook.save();
      return newBook;
    } catch (error) {
      Sentry.captureException(error.message);
      return { error: error.message };
    }
  }

  // Need to validate librarian identity
  // Need more validations!
  // Only a librarian should be allowed
  // create a book, remove a book, etc.
  async deleteBook(bookId: String) {
    try {
      const removeBook = await this.book.deleteOne({ _id: bookId });
      return removeBook;
    } catch (error) {
      Sentry.captureException(error.message);
      return { error: error.message };
    }
  }
}

export { Book, BookController };
