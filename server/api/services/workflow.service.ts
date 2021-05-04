import { IWorkflow } from "../constants/workflow";

class WorkflowService {
  list(): Promise<IWorkflow[]> {
    return Promise.resolve([
      {
        _id: "wer",
        name: "test",
        version: "v1.0.0",
      },
    ]);
  }
}

export default new WorkflowService();
