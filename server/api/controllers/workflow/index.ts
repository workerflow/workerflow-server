import express from "express";

import controller from "./controller";

export default express.Router()
  .get("/", controller.list)
  .get("/:id", controller.get)
  .post("/", controller.post);
