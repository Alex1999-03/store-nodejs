import mongoose from "mongoose";
import { config } from "./config";

(async () => {
  try {
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(
      `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DATABASE}`
    );
    console.log(`Database is connected to: ${db.connection.name}`);
  } catch (error) {
    console.error(error);
  }
})();
