import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";

import { IWorkflow } from "../../constants/workflow";
import WorkflowService from "../../services/workflow.service";

export class Controller {
  list(_: Request, response: Response) {
    WorkflowService.list().then((r) => response.json(r));
  }
  post(request: Request, response: Response, next: NextFunction) {
    let data: IWorkflow = request.body;
    var Workflow = mongoose.model("Workflow");

    var workflow = new Workflow({
      id: data.id,
      name: data.name,
      version: data.version,
    });
    workflow.save().then((data) => {
      console.log(data);
      response.json({ "msg": "text" });
    }).catch((e) => {
      next(e);
    });
  }
}

export default new Controller();
