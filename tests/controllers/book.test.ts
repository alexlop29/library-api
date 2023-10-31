import { BookController, Book } from "../../controllers/book";
import { mongoose } from "../setupFile";
import {describe, expect, test} from '@jest/globals';

const fakeBook = {
  isbn: 1234567891111,
  librarianId: "653d47a4c811c0691340e0d4",
};

const book = new BookController();

test("creates a new book", async () => {
  const newBook = new Book(fakeBook.isbn, fakeBook.librarianId);
  const createBook = await book.createBook(newBook);
  console.log(createBook);
  expect(createBook).toContain("");
});

// test("retrieves all books", async () => {
//   const getAllBooks = await book.getBooks();
//   expect(getAllBooks).toContain("Successfully retrieved all books");
//   // expect(getAllBooks.returnedBooks).toEqual({
//   //     "_id": "653d47a4c811c0691340e0d4",
//   //     "isbn": 9780062079978,
//   //     "librarianId": "653bdd7b96f4c08936a8316d",
//   //     "__v": 0
//   // })
//   expect(getAllBooks.returnedBooks).toHaveProperty(
//     "isbn",
//     expect.assertions(2),
//   );
// });
