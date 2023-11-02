import { BookController, Book } from "../../controllers/book";
import { bookModel } from "../../models/book";

const newSampleBook = {
  isbn: 1234567891111,
  librarianId: "653d47a4c811c0691340e0d4",
};
const nonexistingFakeBookId = "123";

type BookDefinition = {
  _id: Number;
  isbn: Number;
  librarianId: String;
  __v: Number;
};

const book = new BookController();
const getSampleBook = async () => {
  const sampleBook = await bookModel.findOne({ isbn: 1234567891111 });
  return sampleBook._id;
};

test("adds a new book", async () => {
  const newBook = new Book(newSampleBook.isbn, newSampleBook.librarianId);
  const createBook = await book.createBook(newBook);
  expect(createBook.isbn).toEqual(1234567891111);
  expect(createBook.librarianId.toString()).toEqual("653d47a4c811c0691340e0d4");
});

test("retrieves all books", async () => {
  const getAllBooks = await book.getBooks();
  getAllBooks.forEach((item: BookDefinition) => {
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
