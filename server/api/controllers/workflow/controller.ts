import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";

import { IWorkflow } from "../../constants/workflow";

import { RecordNotFound } from "../../../common/error";

export class Controller {
  workflow = mongoose.model("Workflow");

  list = (_: Request, response: Response) => {
    this.workflow.find().lean<IWorkflow[]>().then(data => {
      response.json(data);
    });
  }

  get = async (request: Request, response: Response, next: NextFunction) => {
    const id = Number.parseInt(request.params["id"]);

    this.workflow.findOne({ id }).lean<IWorkflow>().then((data: IWorkflow) => {
      if (data == null) {
        next(new RecordNotFound(`workflow not found ${id}`));
      } else {
        response.status(200).json(data);
      }
    }).catch((e) => {
      next(e);
    });
  }

  post = (request: Request, response: Response, next: NextFunction) => {
    let data: IWorkflow = request.body;

    let workflow = new this.workflow({
      name: data.name,
      version: data.version,
    });
    workflow.save().then(() => {
      response.json({ "msg": "text" });
    }).catch((e) => {
      next(e);
    });
  }
}

export default new Controller();
