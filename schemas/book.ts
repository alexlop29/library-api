import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    isbn: {
      type: Number,
      required: true,
    },
    librarianId: {
      type: Schema.Types.ObjectId,
      ref: "librarians",
      required: true,
    },
  },
  {
    collection: "books",
  },
);

export { bookSchema };
