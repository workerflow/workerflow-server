import WorkflowService from "../../services/workflow.service";
import { Request, Response } from "express";

export class Controller {
  list(_: Request, res: Response): void {
    WorkflowService.list().then((r) => res.json(r));
  }
}

export default new Controller();
