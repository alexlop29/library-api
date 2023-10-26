import { patronSchema } from "../schemas/patron";
import { mongoose } from "../config/mongodb";

const patronModel = mongoose.model("patron", patronSchema);

export { patronModel };
