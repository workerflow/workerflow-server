import { Application } from "express";

import workflowsRouter from "./api/controllers/workflow";
import usersRouter from "./api/controllers/users";

export default (app: Application) => {
  app.use("/workflows", workflowsRouter);
  app.use("/users", usersRouter)
};
