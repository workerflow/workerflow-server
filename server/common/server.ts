import os from "os";
import path from "path";
import http from "http";

import bodyParser from "body-parser";
import express, { Application } from "express";

import l from "./logger";

import errorHandler from "../api/middlewares/error.handler";

const app = express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + "/../..");
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || "100kb",
      }),
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || "100kb" }));
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) =>
      (): void =>
        l.info(
          `up and running in ${process.env.NODE_ENV ||
            "development"} @: ${os.hostname()} on port: ${p}}`,
        );

    http.createServer(app).listen(port, welcome(port));

    return app;
  }
}
