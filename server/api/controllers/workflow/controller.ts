import { Request, Response } from "express";

import WorkflowService from "../../services/workflow.service";

export class Controller {
  list(_: Request, res: Response): void {
    WorkflowService.list().then((r) => res.json(r));
  }
}

export default new Controller();
