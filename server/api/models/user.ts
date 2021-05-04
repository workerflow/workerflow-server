import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  email: {
    verify: { type: Boolean },
    data: { type: String, unique: true },
  },
});

mongoose.model("User", User);
