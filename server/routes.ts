import { Application } from "express";

import workflowsRouter from "./api/controllers/workflow/router";

export default (app: Application) => {
  app.use("/api/v1/workflows", workflowsRouter);
};
