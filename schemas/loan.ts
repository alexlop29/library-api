import mongoose from "mongoose";

const { Schema } = mongoose;

const loanSchema = new Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: false,
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "bookSchema",
    required: true,
  },
  patronId: {
    type: Schema.Types.ObjectId,
    ref: "patronSchema",
    required: true,
  },
  isReturned: {
    type: Boolean,
    required: true,
  }
}, {
    collection: "loans",
});

export { loanSchema }
