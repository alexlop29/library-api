import { librarianSchema } from "../schemas/librarian";
import { mongoose } from "../config/mongodb";

const librarianModel = mongoose.model("librarian", librarianSchema);

export { librarianModel };
