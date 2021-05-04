import { Response, Request, NextFunction } from "express";

import GeneralResponse from "../../common/GeneralResponse";

export function responseMiddleware(err: GeneralResponse, _request: Request, response: Response, _next: NextFunction): void {
  response.status(err.getCode()).json(err);
}
