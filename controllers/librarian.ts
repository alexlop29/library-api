//@ts-nocheck
import { librarianModel } from "../models/librarian";
import * as Sentry from "@sentry/node";

class Librarian {
  firstName: String;
  lastName: String;
  email: String;

  // NOTE: May want to add a validation to the schmea requiring ...@... for the email
  constructor(firstName: String, lastName: String, email: String) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

class LibrarianController {
  librarian = librarianModel;

  constructor() {}

  // Analyze returned element; for type check
  // consider createing an error handling controller
  /*
NOTE: (alopez) Consider improving error handling by querying for a `validation` to
return a 400 error.
*/
  async createLibrarian(librarian: Librarian) {
    try {
      let newLibrarian = new this.librarian({
        firstName: librarian.firstName,
        lastName: librarian.lastName,
        email: librarian.email,
      });
      await newLibrarian.save();
      return newLibrarian;
    } catch (error) {
      Sentry.captureException(error.message);
      return { error: error.message };
    }
  }

  // Analyze returned element; for type check
  // consider createing an error handling controller
  async getLibrarians(): JSON {
    try {
      let allLibrarians = await this.librarian.find({});
      return allLibrarians;
    } catch (error) {
      Sentry.captureException(error.message);
      return { error: error.message };
    }
  }

  async getLibrarianId(email: String) {
    try {
      const locatedLibrarian = await this.librarian.findOne({ email: email });
      if (!locatedLibrarian) {
        return { error: "Librarian not found for the provided email" };
      }
      return locatedLibrarian._id;
    } catch (error) {
      Sentry.captureException(error.message);
      return { error: error.message };
    }
  }
}

export { Librarian, LibrarianController };
