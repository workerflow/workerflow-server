import mongoose from "mongoose";

export interface IWorkflow {
  id: number;
  name: string;
  version: string;
}
