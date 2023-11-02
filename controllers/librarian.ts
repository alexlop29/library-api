import { librarianModel } from "../models";
import * as Sentry from "@sentry/node";

class Librarian {
  firstName: String;
  lastName: String;
  email: String;

  constructor(firstName: String, lastName: String, email: String) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

class LibrarianController {
  librarian = librarianModel;

  constructor() {}

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
      if (error instanceof Error) {
        Sentry.captureException(error.message);
      }
      if (error instanceof Error) {
        return { error: error.message };
      }
    }
  }

  async getLibrarians() {
    try {
      let allLibrarians = await this.librarian.find({});
      return allLibrarians;
    } catch (error) {
      if (error instanceof Error) {
        Sentry.captureException(error.message);
      }
      if (error instanceof Error) {
        return { error: error.message };
      }
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
      if (error instanceof Error) {
        Sentry.captureException(error.message);
      }
      if (error instanceof Error) {
        return { error: error.message };
      }
    }
  }
}

export { Librarian, LibrarianController };
