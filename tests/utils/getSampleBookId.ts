import { bookModel } from "../../models/book";

const getSampleBookId = async () => {
  const sampleBook = await bookModel.findOne({
    isbn: 1234567891111,
  });
  return sampleBook._id;
};

export { getSampleBookId };
