import { loanSchema } from "../schemas/loan";
import { mongoose } from "../config/mongodb";

const loanModel = mongoose.model("loan", loanSchema);

export { loanModel };
