//@ts-nocheck
import { patronModel } from "../models/patron";
import { librarianModel } from "../models/librarian";
import { bookModel } from "../models/book";
import { mongoose } from "../config/mongodb";

const samplePatron = {
  firstName: "Jelly",
  lastName: "Beans",
  email: "jellybeans@gmail.com",
  status: true,
};

const sampleLibrarian = {
  firstName: "Peanut",
  lastName: "Butter",
  email: "peanut@butter.com",
};

const sampleBook = {
  isbn: 1234567891111,
};

module.exports = async function (globalConfig, projectConfig) {
  await mongoose.connection.dropCollection("patrons");
  await mongoose.connection.dropCollection("librarians");
  await mongoose.connection.dropCollection("books");
  const patronInfo = patronModel(samplePatron);
  await patronInfo.save();
  const librarianInfo = librarianModel(sampleLibrarian);
  await librarianInfo.save();
  const newBook = {
    isbn: sampleBook.isbn,
    librarianId: librarianInfo._id,
  };
  const bookInfo = bookModel(newBook);
  await bookInfo.save();
};
