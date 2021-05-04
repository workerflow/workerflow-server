import { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import jwt, { VerifyErrors, VerifyOptions } from 'jsonwebtoken';

import GeneralResponse from "../../common/GeneralResponse";
import { ReasonTokenExpired } from '../../common/reason';

export default function jwtMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || "test", { algorithm: ["HS512"] } as VerifyOptions,
      (err: VerifyErrors | null, _user: object | undefined) => {
        if (err) {
          res.status(StatusCodes.UNAUTHORIZED).json(new GeneralResponse(ReasonPhrases.UNAUTHORIZED, ReasonTokenExpired, `token has expired`));
        } else {
          next();
        }
      });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json(new GeneralResponse(ReasonPhrases.UNAUTHORIZED, ReasonTokenExpired, `token has expired`));
  }
};
