import { Response } from "express";

export default function errorHandler(err: any, response: Response): void {
  const errors = err.errors || [{ message: err.message }];
  response.status(err.status || 500).json({ errors });
}
