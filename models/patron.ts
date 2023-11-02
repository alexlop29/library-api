import { patronSchema } from "../schemas";
import { mongoose } from "../config/mongodb";

const patronModel = mongoose.model("patron", patronSchema);

export { patronModel };
