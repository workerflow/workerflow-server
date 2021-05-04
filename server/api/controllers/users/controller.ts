import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";

import { IUser } from "../../constants/user";

import { RecordNotFound } from "../../../common/error";

export class Controller {
  user = mongoose.model("User");

  login = (request: Request, response: Response, _: NextFunction) => {
    let data: IUser = request.body;
    console.log(data);

    const accessToken = jwt.sign({
      username: data.username, email: data.email, exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, process.env.JWT_SECRET || "test", { algorithm: "HS512" });

    response.json({ "msg": accessToken });

  }

  check = (_: Request, response: Response) => {
    response.json({ "msg": "ok" });
  }
}

export default new Controller();
