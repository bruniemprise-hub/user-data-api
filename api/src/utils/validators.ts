import { IUser } from '../types';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateUser = (user: any): IUser => {
  if (!user.id || typeof user.id !== 'string') {
    throw new ValidationError('Campo "id" é obrigatório e deve ser uma string');
  }

  if (!user.first_name || typeof user.first_name !== 'string') {
    throw new ValidationError('Campo "first_name" é obrigatório e deve ser uma string');
  }

  if (!user.last_name || typeof user.last_name !== 'string') {
    throw new ValidationError('Campo "last_name" é obrigatório e deve ser uma string');
  }

  if (!user.email || typeof user.email !== 'string') {
    throw new ValidationError('Campo "email" é obrigatório e deve ser uma string');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email)) {
    throw new ValidationError(`Email inválido: ${user.email}`);
  }

  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  };
};

export const validateJsonFile = (file: Express.Multer.File | undefined): void => {
  if (!file) {
    throw new ValidationError('Nenhum arquivo foi enviado');
  }

  if (file.mimetype !== 'application/json') {
    throw new ValidationError('O arquivo deve ser do tipo JSON');
  }

  if (file.size === 0) {
    throw new ValidationError('O arquivo está vazio');
  }
};