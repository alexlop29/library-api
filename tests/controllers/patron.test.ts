import { PatronController, Patron } from "../../controllers/patron";
import { getSamplePatronId } from "../utils/getSamplePatronId";

const newSamplePatron = {
  firstName: "Ben",
  lastName: "Lopez",
  email: "ben@thecutestdog.com",
};

type PatronDefinition = {
  _id: Number;
  firstName: String;
  lastName: String;
  email: String;
  status: Boolean;
  __v: Number;
};

const patron = new PatronController();

test("adds a new patron", async () => {
  const newPatron = new Patron(
    newSamplePatron.firstName,
    newSamplePatron.lastName,
    newSamplePatron.email,
  );
  const createPatron = await patron.createPatron(newPatron);
  expect(createPatron.firstName).toEqual(newSamplePatron.firstName);
  expect(createPatron.lastName).toEqual(newSamplePatron.lastName);
  expect(createPatron.email).toEqual(newSamplePatron.email);
});

test("retrieves a patron by id", async () => {
  const samplePatronId = await getSamplePatronId();
  const getPatronInfo = await patron.getPatronById(samplePatronId);
  expect(getPatronInfo.firstName).toEqual("Jelly");
});

test("retrieves all patrons", async () => {
  const getAllPatrons = await patron.getPatrons();
  getAllPatrons.forEach((item: PatronDefinition) => {
    expect(item.firstName).toEqual(expect.any(String));
    expect(item.lastName).toEqual(expect.any(String));
  });
});
