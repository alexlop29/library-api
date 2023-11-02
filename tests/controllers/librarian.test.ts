import { LibrarianController, Librarian } from "../../controllers/librarian";
import { librarianModel } from "../../models/librarian";

const newSampleLibrarian = {
  firstName: "Bacon",
  lastName: "Eggs",
  email: "baconeggs@cheese.com",
};

type LibrarianDefinition = {
  _id: Number;
  firstName: String;
  lastName: String;
  email: String;
  __v: Number;
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
    newSampleLibrarian.firstName,
    newSampleLibrarian.lastName,
    newSampleLibrarian.email,
  );
  const createLibrarian = await librarian.createLibrarian(newLibrarian);
  expect(createLibrarian.firstName).toEqual(newSampleLibrarian.firstName);
  expect(createLibrarian.lastName).toEqual(newSampleLibrarian.lastName);
  expect(createLibrarian.email).toEqual(newSampleLibrarian.email);
});

test("retrieves id using the librarian's email address", async () => {
  const sampleLibrarianId = await getSampleLibrarianId();
  const getLibrarianId = await librarian.getLibrarianId("peanut@butter.com");
  expect(getLibrarianId).toEqual(sampleLibrarianId);
});

test("retrieves all librarians", async () => {
  const getAllLibrarians = await librarian.getLibrarians();
  getAllLibrarians.forEach((item: LibrarianDefinition) => {
    expect(item.firstName).toEqual(expect.any(String));
    expect(item.lastName).toEqual(expect.any(String));
  });
});
