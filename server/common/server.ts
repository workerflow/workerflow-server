import os from "os";
import http from "http";

import express, { Application } from "express";

import l from "./logger";

import { errMiddleware } from "../api/middlewares";

const app = express();

export default class ExpressServer {
  constructor() {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    app.use(errMiddleware);
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
