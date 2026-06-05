import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {

  console.error(error);

  if (error.code === '23505') {
    return res.status(409).json({
      message: 'Customer email already exists'
    });
  }

  return res.status(500).json({
    message: 'Internal server error'
  });
}