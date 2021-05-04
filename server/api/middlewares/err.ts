import { Response } from "express";

export function errMiddleware(err: any, response: Response): void {
  const errors = err.errors || [{ message: err.message }];
  response.status(err.status || 500).json({ errors });
}
