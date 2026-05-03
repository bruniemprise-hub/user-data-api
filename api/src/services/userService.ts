import fs from 'fs/promises';
import { User } from '../models/User';
import { IUser } from '../types';
import { validateUser, validateJsonFile } from '../utils/validators';

export class UserService {
  async processAndSaveUsers(file: Express.Multer.File): Promise<{
    success: number;
    failed: number;
    total: number;
    duration: number;
  }> {
    const startTime = Date.now();
    
    validateJsonFile(file);

    const fileContent = await fs.readFile(file.path, 'utf-8');
    const users = JSON.parse(fileContent);

    if (!Array.isArray(users)) {
      throw new Error('O arquivo JSON deve conter um array de usuários');
    }

    let successCount = 0;
    let failedCount = 0;
    const batchSize = 1000;
    const validUsers: IUser[] = [];

    // Validar todos os usuários primeiro
    for (const user of users) {
      try {
        const validUser = validateUser(user);
        validUsers.push(validUser);
      } catch (error) {
        failedCount++;
        console.warn(`⚠️ Usuário inválido (id: ${user.id}):`, error);
      }
    }

    // Inserir em lotes para melhor performance
    for (let i = 0; i < validUsers.length; i += batchSize) {
      const batch = validUsers.slice(i, i + batchSize);
      
      try {
        await User.insertMany(batch, { ordered: false });
        successCount += batch.length;
      } catch (error: any) {
        // Contar sucessos mesmo com duplicatas
        if (error.writeErrors) {
          successCount += batch.length - error.writeErrors.length;
          failedCount += error.writeErrors.length;
        } else {
          failedCount += batch.length;
        }
      }
    }

    // Limpar arquivo após processamento
    await fs.unlink(file.path);

    const duration = Date.now() - startTime;

    return {
      success: successCount,
      failed: failedCount,
      total: users.length,
      duration
    };
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await User.findOne({ id }).select('-_id -__v -createdAt -updatedAt');
    return user ? user.toObject() : null;
  }

  async getAllUsers(limit: number = 100, skip: number = 0): Promise<{
    users: IUser[];
    total: number;
  }> {
    const [users, total] = await Promise.all([
      User.find().select('-_id -__v -createdAt -updatedAt').limit(limit).skip(skip),
      User.countDocuments()
    ]);

    return {
      users: users.map(u => u.toObject()),
      total
    };
  }
}