import mongoose from "mongoose";
import { ReasonPhrases } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import { IWorkflow } from "../../constants/workflow";
import GeneralResponse from "../../../common/GeneralResponse";
import { ReasonUnknown, ReasonRecordNotFound } from "../../../common/reason";

export class Controller {
  workflow = mongoose.model("Workflow");

  list = (_request: Request, _response: Response, next: NextFunction) => {
    this.workflow.find().lean<IWorkflow[]>().then(data => {
      next(new GeneralResponse(ReasonPhrases.OK).setData(data));
    });
  }

  get = async (request: Request, _response: Response, next: NextFunction) => {
    const id = Number.parseInt(request.params["id"]);

    this.workflow.findOne({ id }).lean<IWorkflow>().then((data: IWorkflow) => {
      if (data == null) {
        next(new GeneralResponse(ReasonPhrases.BAD_REQUEST, ReasonRecordNotFound, `workflow not found ${id}`));
      } else {
        next(new GeneralResponse(ReasonPhrases.OK).setData(data));
      }
    }).catch((e) => {
      next(new GeneralResponse(ReasonPhrases.BAD_REQUEST, ReasonUnknown, e));
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
      next(new GeneralResponse(ReasonPhrases.OK).setData(workflow));
    }).catch((e) => {
      next(new GeneralResponse(ReasonPhrases.BAD_REQUEST, ReasonUnknown, e));
    });
  }
}

export default new Controller();
