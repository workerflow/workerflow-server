import { Response, Request, NextFunction } from "express";

import GeneralResponse from "../../common/GeneralResponse";

export function responseMiddleware(generalResponse: GeneralResponse, _request: Request, response: Response, _next: NextFunction): void {
  response.status(generalResponse.getCode()).json({
    reason: generalResponse.reason,
    message: generalResponse.message,
    data: generalResponse.data
  });
  // response.status(generalResponse.getCode()).json(generalResponse);
}
