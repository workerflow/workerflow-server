import mongoose from "mongoose";

export interface IWorkflow {
  _id: string;
  name: string;
  version: string;
}
