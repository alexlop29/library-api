import mongoose from "mongoose";

const { Schema } = mongoose;

const librarianSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: "librarians",
  },
);

export { librarianSchema };
