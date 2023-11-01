//@ts-nocheck
import { BookController, Book } from "../../controllers/book";
import { bookModel } from "../../models/book";

const fakeBook = {
  isbn: 1234567891111,
  librarianId: "653d47a4c811c0691340e0d4",
};
const nonexistingFakeBookId = "123";

const book = new BookController();
const getSampleBook = async () => {
  const sampleBook = await bookModel.findOne({ isbn: 1234567891111 });
  return sampleBook._id;
};

test("adds a new book", async () => {
  const newBook = new Book(fakeBook.isbn, fakeBook.librarianId);
  const createBook = await book.createBook(newBook);
  expect(createBook.isbn).toEqual(1234567891111);
  expect(createBook.librarianId.toString()).toEqual("653d47a4c811c0691340e0d4");
});

test("retrieves all books", async () => {
  const getAllBooks = await book.getBooks();
  getAllBooks.forEach((item) => {
    expect(item.isbn).toEqual(expect.any(Number));
    expect(item.librarianId.toString()).toEqual(expect.any(String));
  });
});

test("retrieves a book by id", async () => {
  const sampleBookId = await getSampleBook();
  const getBookById = await book.getBookById(sampleBookId);
  expect(getBookById.isbn).toEqual(1234567891111);
});

test("fails when retrieving a book not in the library", async () => {
  const getBookById = await book.getBookById(nonexistingFakeBookId);
  expect(getBookById.error).toContain(
    `failed for value "${nonexistingFakeBookId}"`,
  );
});
