import { librarianSchema } from "../schemas";
import { mongoose } from "../config/mongodb";

const librarianModel = mongoose.model("librarian", librarianSchema);

export { librarianModel };
