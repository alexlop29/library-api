import express from 'express';
import { librarianModel } from '../models/librarian';
import { patronModel } from '../models/patron';
import * as Sentry from "@sentry/node";

const adminRoute = express.Router();
adminRoute.use(express.json());

const librarian = librarianModel; 
const patron = patronModel;

/*
Confirm error handling works as expected
*/
const createLibrarian = async ( librarianInfo ) => {
    let newLibrarian = new librarian({
        firstName: librarianInfo.firstName,
        lastName: librarianInfo.lastName,
        email: librarianInfo.email
    })
    await newLibrarian.save();
    if (!newLibrarian) {
        return {error: "Unable to add a new librarian"}
    }
    return newLibrarian;
}

adminRoute.post('/librarian', async (req, res) => {
  const librarianInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }
  const addLibrarian = await createLibrarian(librarianInfo);
  if (!addLibrarian) {
    res.status(500).json({ error: 'Unable to add a new librarian' });
    Sentry.captureMessage("error: 'Unable to add a new librarian'");
  }
  res.status(200).json({ status: 'Successfully updated cart' });
});
