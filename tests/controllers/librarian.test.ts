//@ts-nocheck
import { LibrarianController, Librarian } from "../../controllers/librarian";
import { librarianModel } from "../../models/librarian";

const sampleLibrarian2 = {
  firstName: "Bacon",
  lastName: "Eggs",
  email: "baconeggs@cheese.com",
};

const librarian = new LibrarianController();
const getSampleLibrarian = async () => {
  const sampleLibrarian = await librarianModel.find({
    email: "peanut@butter.com",
  });
};

test("adds a new librarian", async () => {
  const newLibrarian = new Librarian(
    sampleLibrarian2.firstName,
    sampleLibrarian2.lastName,
    sampleLibrarian2.email,
  );
  const createLibrarian = await librarian.createLibrarian(newLibrarian);
  expect(createLibrarian.firstName).toEqual(sampleLibrarian2.firstName);
  expect(createLibrarian.lastName).toEqual(sampleLibrarian2.lastName);
  expect(createLibrarian.email).toEqual(sampleLibrarian2.email);
});
