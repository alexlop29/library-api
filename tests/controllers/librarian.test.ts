//@ts-nocheck
import { LibrarianController, Librarian } from "../../controllers/librarian";
import { librarianModel } from "../../models/librarian";

const sampleLibrarian2 = {
  firstName: "Bacon",
  lastName: "Eggs",
  email: "baconeggs@cheese.com",
};

const librarian = new LibrarianController();
const getSampleLibrarianId = async () => {
  const sampleLibrarian = await librarianModel.findOne({
    email: "peanut@butter.com",
  });
  return sampleLibrarian._id;
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

test("retrieves id using the librarian's email address", async () => {
  const sampleLibrarianId = await getSampleLibrarianId();
  const getLibrarianId = await librarian.getLibrarianId("peanut@butter.com");
  expect(getLibrarianId).toEqual(sampleLibrarianId);
});

test("retrieves all librarians", async () => {
  const getAllLibrarians = await librarian.getLibrarians();
  getAllLibrarians.forEach((item) => {
    expect(item.firstName).toEqual(expect.any(String));
    expect(item.lastName).toEqual(expect.any(String));
  });
});
