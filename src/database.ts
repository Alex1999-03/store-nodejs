import mongoose from "mongoose";
import { config } from "./config";

(async () => {
  try {
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(
      `mongodb://${config.MONGO_HOST}:27017/${config.MONGO_DATABASE}`
    );
    console.log(`Database is connected to: ${db.connection.name}`);
  } catch (error) {
    console.error(error);
  }
})();
