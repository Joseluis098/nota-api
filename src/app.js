import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API de notas activa',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
