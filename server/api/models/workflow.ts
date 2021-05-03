import mongoose from "mongoose";

const Workflow = new mongoose.Schema({
  name: { type: String, unique: true },
  version: { type: String },
  body: { type: Object },
});

mongoose.model("Workflow", Workflow);
