import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/validators';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('❌ Erro:', error);

  if (error instanceof ValidationError) {
    res.status(400).json({
      error: 'Validation Error',
      message: error.message
    });
    return;
  }

  if (error.name === 'MulterError') {
    res.status(400).json({
      error: 'Upload Error',
      message: error.message
    });
    return;
  }

  if (error.name === 'MongoServerError' && (error as any).code === 11000) {
    res.status(409).json({
      error: 'Duplicate Error',
      message: 'Usuário com este ID ou email já existe'
    });
    return;
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno do servidor'
  });
};