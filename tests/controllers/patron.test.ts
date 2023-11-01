import { PatronController, Patron } from "../../controllers/patron";
// import { fakePatronWithLoansId } from "../globalSetup";

const fakePatronWithoutLoans = {
  firstName: "Ben",
  lastName: "Lopez",
  email: "ben@thecutestdog.com",
};

const patron = new PatronController();

test("adds a new patron", async () => {
  const newPatron = new Patron(
    fakePatronWithoutLoans.firstName,
    fakePatronWithoutLoans.lastName,
    fakePatronWithoutLoans.email,
  );
  const createPatron = await patron.createPatron(newPatron);
  console.log(createPatron);
  expect(createPatron.firstName).toEqual(fakePatronWithoutLoans.firstName);
  expect(createPatron.lastName).toEqual(fakePatronWithoutLoans.lastName);
  expect(createPatron.email).toEqual(fakePatronWithoutLoans.email);
});

// test("retrieves a patron using the provided id", async () => {
//   console.log(fakePatronWithLoansId);
//   const getPatronInfo = await patron.getPatronById(fakePatronWithLoansId);
//   console.log(getPatronInfo);
//   expect(getPatronInfo.firstName).toEqual("Jelly");
// });

// test("retrieves all patrons", async () => {
//   const getAllPatrons = await patron.getPatrons();
//   getAllPatrons.forEach((item) => {
//     expect(item.firstName).toEqual(expect.any(String));
//     expect(item.lastName).toEqual(expect.any(String));
//   });
// });
