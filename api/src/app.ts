import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import { connectDatabase } from './config/database';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/users', userRoutes);

// Error Handler (deve ser o último middleware)
app.use(errorHandler);

// Rota 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Rota não encontrada'
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📡 API: http://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;