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
  pat = patronModel;

  constructor() {}

  // Analyze returned element; for type check
  // consider createing an error handling controller
  /*
NOTE: (alopez) Consider improving error handling by querying for a `validation` to
return a 400 error.
*/
  async createPatron(patron: Patron): JSON {
    try {
      let newPatron = new this.pat({
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

  // Analyze returned element; for type check
  // consider createing an error handling controller
  async getPatrons(): JSON {
    try {
      let allPatrons = await this.pat.find({});
      return allPatrons;
    } catch (error) {
      Sentry.captureException(error.message);
      return { error: error.message };
    }
  }
}

export { Patron, PatronController };
