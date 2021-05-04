import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import { ReasonPhrases } from 'http-status-codes';
import { NextFunction, Request, Response } from "express";

import { IUser } from "../../constants/user";
import GeneralResponse from "../../../common/GeneralResponse";
import { ReasonLoginPassword, ReasonUnknown } from "../../../common/reason";

const defaultSecret = "secret";

export class Controller {
  user = mongoose.model("User");

  login = (request: Request, _response: Response, next: NextFunction) => {
    let data: IUser = request.body;

    this.user.findOne({ username: data.username }).lean<IUser>().then((user: IUser) => {
      if (user == null) {
        next(new GeneralResponse(ReasonPhrases.UNAUTHORIZED, ReasonLoginPassword, `password or username is not correct`));
      } else {
        bcrypt.compare(data.password, user.password, (err: Error, same: boolean) => {
          if (err) {
            console.log(same);
            next(new GeneralResponse(ReasonPhrases.BAD_REQUEST, ReasonUnknown, err.message));
          } else if (!same) {
            next(new GeneralResponse(ReasonPhrases.UNAUTHORIZED, ReasonLoginPassword, `password or username is not correct`));
          } else {
            next(new GeneralResponse(ReasonPhrases.OK).setData({ "token": this.jwtHash(data) }));
          }
        })
      }
    }).catch(e => {
      next(new GeneralResponse(ReasonPhrases.BAD_REQUEST, ReasonLoginPassword, `password or username is not correct: ${e}`));
    });
  }

  jwtHash = (user: IUser): string => {
    return jwt.sign({
      username: user.username, email: user.email, exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, process.env.JWT_SECRET || defaultSecret, { algorithm: "HS512" });
  }

  signup = (request: Request, _response: Response, next: NextFunction) => {
    let data: IUser = request.body;

    bcrypt.hash(data.password, process.env.PWD_SECRET || defaultSecret, (err: Error, hash: string) => {
      if (err) {
        next(new GeneralResponse(ReasonPhrases.BAD_REQUEST, ReasonUnknown, err.message));
      } else {
        let user = new this.user({
          username: data.username,
          password: hash,
          email: {
            verify: false,
            data: data.email,
          }
        });
        user.save().then(() => {
          next(new GeneralResponse(ReasonPhrases.OK).setData({ "token": this.jwtHash(data) }));
        }).catch(e => {
          next(new GeneralResponse(ReasonPhrases.BAD_REQUEST, ReasonUnknown, e));
        });
      }
    });
  }

  check = (_: Request, _response: Response, next: NextFunction) => {
    next(new GeneralResponse(ReasonPhrases.OK).setData({ "verify": true }));
  }
}

export default new Controller();
