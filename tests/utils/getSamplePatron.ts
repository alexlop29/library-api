import { patronModel } from "../../models/patron";

const getSamplePatron = async () => {
    const samplePatron = await patronModel.findOne({
      email: "jellybeans@gmail.com",
    });
    return samplePatron._id;
};

export { getSamplePatron };
