import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";

import { IWorkflow } from "../../constants/workflow";
import WorkflowService from "../../services/workflow.service";

import { RecordNotFound } from "../../../common/error";

export class Controller {
  list(_: Request, response: Response) {
    WorkflowService.list().then((r) => response.json(r));
  }

  async get(request: Request, response: Response, next: NextFunction) {
    const id = Number.parseInt(request.params["id"]);
    let Workflow = mongoose.model("Workflow");
    console.log(id);

    Workflow.findOne({ id }).lean<IWorkflow>().then((data: IWorkflow) => {
      if (data == null) {
        next(new RecordNotFound(`workflow not found ${id}`));
      } else {
        response.status(200).json(data);
      }
    }).catch((e) => {
      next(e);
    });
  }

  post(request: Request, response: Response, next: NextFunction) {
    let data: IWorkflow = request.body;
    let Workflow = mongoose.model("Workflow");

    let workflow = new Workflow({
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
