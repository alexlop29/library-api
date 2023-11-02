import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    isbn: {
      type: Number,
      required: true,
      validate: {
        validator: function (isbn: string) {
          return /^\d{13}$/.test(isbn);
        },
        message: "ISBN must be exactly 13 digits.",
      },
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
