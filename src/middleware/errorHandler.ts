import { Request, Response, NextFunction } from 'express';

// Custom error class for 404 Not Found
export class NotFoundError extends Error {
  statusCode = 404;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

// General error handler
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof NotFoundError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Something went wrong' }); // TODO: TRANS
  }
};
