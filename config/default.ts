import { config } from "dotenv";
config({ path: "./config/.env" });

export default {
  port: process.env.PORT,
  dbUri: process.env.DB_URL,
  saltWorkFactor: 10,
};
