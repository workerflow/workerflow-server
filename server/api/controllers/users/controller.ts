import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import { ReasonPhrases } from 'http-status-codes';
import { NextFunction, Request, Response } from "express";

import GeneralResponse from "../../../common/GeneralResponse";
import { IUser, IUserJWT, IUserRequest } from "../../constants/user";
import { ReasonLoginPassword, ReasonUnknown, ReasonRecordNotFound, ReasonSignupUsernameConflict } from "../../../common/reason";

const defaultSecret = "secret";

export class Controller {
  user = mongoose.model("User");

  login = (request: Request, _response: Response, next: NextFunction) => {
    let data: IUserRequest = request.body;

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
            next(new GeneralResponse(ReasonPhrases.OK).setData({ "token": this.jwtHash(user) }));
          }
        })
      }
    }).catch(e => {
      next(new GeneralResponse(ReasonPhrases.BAD_REQUEST, ReasonLoginPassword, `password or username is not correct: ${e}`));
    });
  }

  jwtHash = (user: IUser): string => {
    return jwt.sign({
      username: user.username, email: user.email.data, exp: Math.floor(Date.now() / 1000) + (60 * 60),
    } as IUserJWT, process.env.JWT_SECRET || defaultSecret, { algorithm: "HS512" });
  }

  signup = async (request: Request, _response: Response, next: NextFunction) => {
    let data: IUserRequest = request.body;
    try {
      let user: IUser = await this.user.findOne({ username: data.username }).lean<IUser>();
      if (user) {
        next(new GeneralResponse(ReasonPhrases.BAD_REQUEST, ReasonSignupUsernameConflict));
        return;
      }
    } catch (error) {
      next(new GeneralResponse(ReasonPhrases.BAD_REQUEST, ReasonUnknown, error.message));
      return;
    }

    let user: IUser;
    try {
      let hash = await bcrypt.hash(data.password, process.env.PWD_SECRET || defaultSecret);
      user = {
        username: data.username,
        password: hash,
        email: {
          verify: false,
          data: data.email,
        }
      };
    } catch (error) {
      next(new GeneralResponse(ReasonPhrases.BAD_REQUEST, ReasonUnknown, error.message));
      return;
    }

    try {
      await new this.user(user).save();
      next(new GeneralResponse(ReasonPhrases.CREATED).setData({ "token": this.jwtHash(user) }));
    } catch (error) {
      next(new GeneralResponse(ReasonPhrases.BAD_REQUEST, ReasonUnknown, error));
    }
  }

  check = (_user: IUserJWT, _request: Request, _response: Response, next: NextFunction) => {
    next(new GeneralResponse(ReasonPhrases.OK).setData({ "verify": true }));
  }

  list = (_request: Request, _response: Response, next: NextFunction) => {
    this.user.find().lean<IUser[]>().then(data => {
      next(new GeneralResponse(ReasonPhrases.OK).setData(data));
    });
  }

  get = (request: Request, _response: Response, next: NextFunction) => {
    const id = request.params["id"];
    this.user.findOne({ _id: id }).lean<IUser>().then((data: IUser) => {
      if (data == null) {
        next(new GeneralResponse(ReasonPhrases.BAD_REQUEST, ReasonRecordNotFound, `workflow not found ${id}`));
      } else {
        next(new GeneralResponse(ReasonPhrases.OK).setData(data));
      }
    }).catch((e) => {
      next(new GeneralResponse(ReasonPhrases.BAD_REQUEST, ReasonUnknown, e));
    });
  }
}

export default new Controller();
