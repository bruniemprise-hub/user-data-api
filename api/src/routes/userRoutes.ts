import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { upload } from '../middlewares/upload';

const router = Router();
const userController = new UserController();

/**
 * @route POST /api/users/upload
 * @desc Upload e processamento do arquivo JSON com usuários
 * @access Public
 */
router.post(
  '/upload',
  upload.single('file'),
  (req, res) => userController.uploadUsers(req, res)
);

/**
 * @route GET /api/users/:id
 * @desc Buscar usuário por ID
 * @access Public
 */
router.get(
  '/:id',
  (req, res) => userController.getUserById(req, res)
);

/**
 * @route GET /api/users
 * @desc Listar todos os usuários com paginação
 * @access Public
 */
router.get(
  '/',
  (req, res) => userController.getAllUsers(req, res)
);

export default router;