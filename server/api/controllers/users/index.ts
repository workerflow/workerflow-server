import express from 'express';

import controller from './controller';
import authMiddleware from '../../middlewares/auth';

export default express.Router()
  .post("/action/login", controller.login)
  .post("/action/signup", controller.signup)
  .get("/action/check", authMiddleware, controller.check)
  .get("/", authMiddleware, controller.list)
  .get("/:id", authMiddleware, controller.get)
