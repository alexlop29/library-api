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
  expect(typeof(countOfLoans)).toBe('number');
});
