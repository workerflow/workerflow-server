import { Application } from "express";

import workflowsRouter from "./api/controllers/workflow";
import usersRouter from "./api/controllers/users";

export default (app: Application) => {
  app.use("/api/v1/workflows", workflowsRouter);
  app.use("/api/v1/users", usersRouter)
};
