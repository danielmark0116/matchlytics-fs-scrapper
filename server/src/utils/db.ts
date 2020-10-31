import { createConnection } from "typeorm";
import * as path from "path";
import * as mongoose from "mongoose";
import * as chalk from "chalk";

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
      console.log(chalk.bgGreenBright("Connected with Postgres DB"));
      console.log("Is connected to Postgres: ", conn.isConnected);
    })
    .catch((reason) => {
      console.log("Error while connecting with db");
      console.log(reason);
    });
};

mongoose.connection.on("connecting", () =>
  console.log(chalk.green("Connecting to the mongo db........"))
);
mongoose.connection.on("connected", () =>
  console.log(chalk.bgGreen("connected to the mongo db"))
);

export const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log(chalk.bgRed("Error while connecting to the db"));
    console.log(chalk.red(e.message));
  }
};
