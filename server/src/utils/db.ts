import { createConnection } from "typeorm";
import * as path from "path";
import * as mongoose from "mongoose";
import { seedSuperAdmin } from "../seeds/super-admin";
import { logger } from "./logger";

export const mongoUri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo_matchlytics:27017/${process.env.MONGO_INITDB_ROOT_DATABASE}?authSource=admin`;

export const connectToDb = () => {
  createConnection({
    type: "postgres",
    host: "db_matchlytics", // name of docker-composes service
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    // synchronize: process.env.MODE === "dev", // should be off in prod
    synchronize: true,
    logging: process.env.MODE === "dev",
    entities: [path.join(__dirname, "../entity", "**", "*.entity.{ts,js}")],
    migrations: [path.join(__dirname, "../migration", "**", "*.{ts,js}")],
    subscribers: [path.join(__dirname, "../subscriber", "**", "*.{ts,js}")],
  })
    .then((conn) => {
      logger("Connected with Postgres DB", "success");
      logger("Is connected to Postgres DB: " + conn.isConnected, "success");

      seedSuperAdmin();
    })
    .catch((reason) => {
      logger("Error while connecting with Postgres DB", "error");
      logger(reason, "error");
    });
};

mongoose.connection.on("connecting", () =>
  logger("Connecting to the MongoDB........", "info")
);
mongoose.connection.on("connected", () =>
  logger("Connected to the MongoDB", "success")
);

export const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    logger("Error while connecting with Mongo DB", "error");
    logger(e, "error");
  }
};
