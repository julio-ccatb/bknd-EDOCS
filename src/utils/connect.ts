import mongoose from "mongoose";
import config from "config";
import logger from "../utils/logger";

const dbUri = config.get<string>("dbUri");
async function dbConnect() {
  try {
    await mongoose.connect(dbUri);
  } catch (error) {
    logger.error("🛑 Database Not Connected");
    process.exit(1);
  }
}

mongoose.connection.on("connecting", () => {
  logger.info("Connecting to database...");
});

mongoose.connection.on("connected", () => logger.info("✅ Databese Connected"));
export default dbConnect;
