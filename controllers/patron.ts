//@ts-nocheck
import { patronModel } from "../models/patron";
import * as Sentry from "@sentry/node";

class Patron {
  firstName: String;
  lastName: String;
  email: String;
  status: Boolean;

  // NOTE: May want to add a validation to the schmea requiring ...@... for the email
  constructor(firstName: String, lastName: String, email: String) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.status = true;
  }
}

class PatronController {
  patron = patronModel;

  constructor() {}

  // Analyze returned element; for type check
  // consider createing an error handling controller
  async getPatrons(): JSON {
    try {
      let allPatrons = await this.patron.find({});
      return allPatrons;
    } catch (error) {
      Sentry.captureException(error.message);
      return { error: error.message };
    }
  }

  async getPatronById(patronId: String) {
    try {
      const LocatedPatron = await this.patron.findOne({ _id: patronId });
      if (!LocatedPatron) {
        return { error: "Patron not found" };
      }
      return LocatedPatron;
    } catch (error) {
      Sentry.captureException(error.message);
      return { error: error.message };
    }
  }

  // Analyze returned element; for type check
  // consider createing an error handling controller
  /*
NOTE: (alopez) Consider improving error handling by querying for a `validation` to
return a 400 error.
*/
  async createPatron(patron: Patron): JSON {
    try {
      let newPatron = new this.patron({
        firstName: patron.firstName,
        lastName: patron.lastName,
        email: patron.email,
        status: patron.status,
      });
      await newPatron.save();
      return newPatron;
    } catch (error) {
      Sentry.captureException(error.message);
      return { error: error.message };
    }
  }
}

export { Patron, PatronController };
