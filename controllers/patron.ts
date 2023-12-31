//@ts-nocheck
import { patronModel } from "../models";
import * as Sentry from "@sentry/node";

class Patron {
  firstName: String;
  lastName: String;
  email: String;
  status: Boolean;

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

  async getPatrons() {
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

  async createPatron(patron: Patron) {
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
