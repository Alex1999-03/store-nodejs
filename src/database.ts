import mongoose from "mongoose";
import { config } from "./config";

(async () => {
  try {
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(config.MONGO_URI as string);
    console.log(`Database is connected to: ${db.connection.name}`);
  } catch (error) {
    console.error(error);
  }
})();
