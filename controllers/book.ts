import { bookModel } from "../models";
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
      if (error instanceof Error) {
        Sentry.captureException(error.message);
      }
      if (error instanceof Error) {
        return { error: error.message };
      }
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
      if (error instanceof Error) {
        Sentry.captureException(error.message);
      }
      if (error instanceof Error) {
        return { error: error.message };
      }
    }
  }

  async createBook(book: Book) {
    try {
      const newBook = new this.book({
        isbn: book.isbn,
        librarianId: book.librarianId,
      });
      await newBook.save();
      return newBook;
    } catch (error) {
      if (error instanceof Error) {
        Sentry.captureException(error.message);
      }
      if (error instanceof Error) {
        return { error: error.message };
      }
    }
  }

  async deleteBook(bookId: String) {
    try {
      const removeBook = await this.book.deleteOne({ _id: bookId });
      return removeBook;
    } catch (error) {
      if (error instanceof Error) {
        Sentry.captureException(error.message);
      }
      if (error instanceof Error) {
        return { error: error.message };
      }
    }
  }
}

export { Book, BookController };
