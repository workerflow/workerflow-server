import mongoose from "mongoose";

const Workflow = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String },
  version: { type: String },
});

mongoose.model("Workflow", Workflow);
