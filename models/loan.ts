import { loanSchema } from "../schemas";
import { mongoose } from "../config/mongodb";

const loanModel = mongoose.model("loan", loanSchema);

export { loanModel };
