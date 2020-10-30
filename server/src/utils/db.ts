import { createConnection } from "typeorm";
import * as path from "path";

export const connectToDb = () => {
  createConnection({
    type: "postgres",
    host: "db", // name of docker-composes service
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
      console.log("Connected with DB");
      console.log("Is connected: ", conn.isConnected);
    })
    .catch((reason) => {
      console.log("Error while connecting with db");
      console.log(reason);
    });
};
