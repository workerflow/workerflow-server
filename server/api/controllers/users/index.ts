import express from "express";

import controller from "./controller";
import authMiddleware from '../../middlewares/auth';

export default express.Router()
  .post("/login", controller.login)
  .get("/check", authMiddleware, controller.check)
