import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController {
  async uploadUsers(req: Request, res: Response): Promise<void> {
    const file = req.file;

    if (!file) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Nenhum arquivo foi enviado'
      });
      return;
    }

    const result = await userService.processAndSaveUsers(file);

    res.status(201).json({
      message: 'Arquivo processado com sucesso',
      data: {
        total_records: result.total,
        successful_imports: result.success,
        failed_imports: result.failed,
        processing_time_ms: result.duration
      }
    });
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'ID do usuário é obrigatório'
      });
      return;
    }

    const user = await userService.getUserById(id);

    if (!user) {
      res.status(404).json({
        error: 'Not Found',
        message: `Usuário com ID ${id} não encontrado`
      });
      return;
    }

    res.status(200).json({ user });
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const limit = parseInt(req.query.limit as string) || 100;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const result = await userService.getAllUsers(limit, skip);

    res.status(200).json({
      users: result.users,
      pagination: {
        total: result.total,
        page,
        limit,
        total_pages: Math.ceil(result.total / limit)
      }
    });
  }
}