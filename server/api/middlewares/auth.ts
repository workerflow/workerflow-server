import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, VerifyOptions } from 'jsonwebtoken';

export default function jwtMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET || "test", { algorithm: ["HS512"] } as VerifyOptions, (err: VerifyErrors | null, user: object | undefined) => {
      if (err) {
        res.sendStatus(403);
      }

      // req. = user;
      console.log(user);

      next();
    });
  } else {
    res.sendStatus(401);
  }
};
