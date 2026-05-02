import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Notas Personales',
      version: '1.0.0',
      description:
        'Documentación de la API para gestionar notas. Sigue los principios RESTful: recursos con sustantivos plurales, verbos HTTP estándar, códigos de estado adecuados y respuestas en JSON.',
      contact: {
        name: 'Equipo Backend - Diplomado Univalle',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Servidor de desarrollo',
      },
    ],
    tags: [
      {
        name: 'Notes',
        description: 'Operaciones CRUD sobre notas personales',
      },
      {
        name: 'Health',
        description: 'Verificación del estado del servicio',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT (a aplicar en futuras versiones)',
        },
      },
      schemas: {
        Note: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Identificador único de la nota (Mongo ObjectId)',
              example: '6634c1e5d2a1b9f8e7c1a234',
            },
            title: {
              type: 'string',
              description: 'Título de la nota',
              example: 'Mi primera nota',
            },
            content: {
              type: 'string',
              description: 'Contenido de la nota',
              example: 'Esta es una nota de prueba',
            },
            imageUrl: {
              type: 'string',
              nullable: true,
              description: 'Ruta relativa a la imagen adjunta',
              example: '/uploads/1714596123456-imagen.png',
            },
            userId: {
              type: 'string',
              description: 'Identificador del usuario propietario',
              example: 'user_123',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        NoteInput: {
          type: 'object',
          required: ['title', 'content'],
          properties: {
            title: {
              type: 'string',
              example: 'Mi primera nota',
            },
            content: {
              type: 'string',
              example: 'Contenido de la nota',
            },
            image: {
              type: 'string',
              format: 'binary',
              description: 'Imagen opcional adjunta a la nota',
            },
          },
        },
        NoteUpdateInput: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Título actualizado' },
            content: { type: 'string', example: 'Contenido actualizado' },
            image: {
              type: 'string',
              format: 'binary',
              description: 'Nueva imagen (opcional)',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Mensaje describiendo el error',
            },
          },
        },
        HealthStatus: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'OK' },
            message: { type: 'string', example: 'API de notas activa' },
          },
        },
      },
    },
  },
  apis: ['./src/presentation/routes/*.js', './src/app.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log('📄 Documentación Swagger disponible en http://localhost:3000/api-docs');
};
