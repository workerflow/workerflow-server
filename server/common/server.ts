import os from 'os';
import http from 'http';

import cors from 'cors';
import compression from 'compression';
import express, { Application } from 'express';

import l from './logger';

import { responseMiddleware } from '../api/middlewares';

const app = express();

export default class ExpressServer {
  constructor() {
    app.disable('x-powered-by');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use(compression());
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    app.use(responseMiddleware);
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
