import { MongoMemoryServer } from "mongodb-memory-server";
import config from "./config";

const globalTeardown = async () => {
  if (config.Memory) {
    const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
    await instance.stop();
  }
};

export { globalTeardown };
