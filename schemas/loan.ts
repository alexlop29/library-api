import mongoose from "mongoose";

const { Schema } = mongoose;

const loanSchema = new Schema(
  {
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
    patronId: {
      type: Schema.Types.ObjectId,
      ref: "patrons",
      required: true,
    },
    isReturned: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: "loans",
  },
);

export { loanSchema };
