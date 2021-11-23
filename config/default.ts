import { config } from "dotenv";
import { readFileSync } from "fs";
config({ path: "./config/.env" });

const publicKey = readFileSync("./config/certs/public.pem");
const privateKey = readFileSync("./config/certs/private.pem");

export default {
  port: process.env.PORT,
  dbUri: process.env.DB_URL,
  saltWorkFactor: 10,
  publicKey,
  privateKey,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
};
