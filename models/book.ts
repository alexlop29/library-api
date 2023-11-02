import { bookSchema } from "../schemas";
import { mongoose } from "../config/mongodb";

const bookModel = mongoose.model("book", bookSchema);

export { bookModel };
