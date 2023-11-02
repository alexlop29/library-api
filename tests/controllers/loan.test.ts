//@ts-nocheck
import { LoanController } from "../../controllers/loan";
import { getSamplePatronId } from "../utils/getSamplePatronId";
import { getSampleBookId } from "../utils/getSampleBookId";

const loan = new LoanController();

test("retrieves active loans by the patron id", async () => {
  const samplePatronId = await getSamplePatronId();
  const sampleBookId = await getSampleBookId();
  const activeLoans = await loan.getActiveLoansByPatronId(samplePatronId);
  expect(activeLoans[0].bookId.toString()).toEqual(sampleBookId.toString());
  expect(activeLoans[0].patronId.toString()).toEqual(samplePatronId.toString());
});

test("retrieves count of active loans by the patron id", async () => {
  const samplePatronId = await getSamplePatronId();
  const countOfLoans =
    await loan.getCountOfActiveLoansByPatronId(samplePatronId);
  expect(typeof countOfLoans).toBe("number");
});

test("gets status of overdue books by the patron id", async () => {
  const samplePatronId = await getSamplePatronId();
  const overdueBooks = await loan.getOverdueStatusByPatronId(samplePatronId);
  expect(JSON.stringify(overdueBooks)).toContain("No overdue books");
});

test("retrieves all overdue books", async () => {
  const allOverdueBooks = await loan.getAllOverdueBooks();
  expect(allOverdueBooks).toStrictEqual([]);
});

test("retrieves the availability of a book loan", async () => {
  const sampleBookId = await getSampleBookId();
  const bookAvailability = await loan.getLoanAvailability(sampleBookId);
  expect(JSON.stringify(bookAvailability)).toContain("Book is unavailable");
});
