import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';

import { connectMongo } from './infrastructure/database/mongo/connection.js';
import { setupSwagger } from './infrastructure/config/swagger.config.js';
import noteRouter from './presentation/routes/note.router.js';
import categoryRouter from './presentation/routes/category.router.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

setupSwagger(app);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica el estado del servicio
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Servicio activo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthStatus'
 */
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API de notas activa',
  });
});

app.use('/api/v1', noteRouter);
app.use('/api/v1', categoryRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Recurso no encontrado' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});
