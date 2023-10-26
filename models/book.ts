import { bookSchema } from "../schemas/book";
import { mongoose } from "../config/mongodb";

const bookModel = mongoose.model("book", bookSchema);

export { bookModel };
