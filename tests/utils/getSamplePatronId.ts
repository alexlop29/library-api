import { patronModel } from "../../models/patron";

const getSamplePatronId = async () => {
  const samplePatron = await patronModel.findOne({
    email: "jellybeans@gmail.com",
  });
  return samplePatron._id;
};

export { getSamplePatronId };
