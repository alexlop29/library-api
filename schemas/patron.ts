import mongoose from "mongoose";

const { Schema } = mongoose;

const patronSchema = new Schema({
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
  },
  status: {
    type: Boolean,
    required: true,
  }
}, {
    collection: 'patrons',
});

export { patronSchema }
