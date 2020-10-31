import "reflect-metadata";
import * as Express from "express";
import * as morgan from "morgan";
import * as path from "path";
import * as cors from "cors";
import * as passport from "passport";
import * as helmet from "helmet";
import UserRouter from "./src/routes/users.routes";
import AuthRouter from "./src/routes/auth.routes";
import { initPassport, initGoogleOAuth } from "./src/utils/passport";
import { connectToDb, connectToMongo } from "./src/utils/db";

const app = Express();
const port = process.env.SERVER_PORT;

if (process.env.MODE === "dev") {
  app.use(morgan("tiny"));
}

connectToDb();
connectToMongo();

app.use(cors());
app.use(helmet());
app.use(Express.json());
app.use(passport.initialize());
app.use(passport.session());

initPassport();
initGoogleOAuth();

// ---------------------------------------------------
// ---------------------- STATIC CONTENT -----------
// ---------------------------------------------
app.use(
  "/.well-known",
  Express.static(path.join(__dirname, "../public"), {
    setHeaders: (res) => {
      res.type("application/json");
    },
  })
);

// ------------------------------------------------
// ------------------- ROUTERS ------------------
// ---------------------------------------------
app.use("/api/users", UserRouter);
app.use("/auth", AuthRouter);

app.get("/", (_: Express.Request, res: Express.Response) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(port, () => {
  console.log("MODE: ", process.env.MODE);
  console.log("Server run on port: ", port);
});
