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
        name: 'Categories',
        description: 'Categorías para organizar las notas',
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
            categoryId: {
              type: 'string',
              nullable: true,
              description: 'Identificador (o documento populado) de la categoría asociada',
              example: '6635a2b3c4d5e6f7a8b9c0d1',
            },
            isPrivate: {
              type: 'boolean',
              description: 'Si es true, no se puede acceder vía /notes/:id/public',
              example: false,
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
            isPrivate: {
              type: 'boolean',
              example: false,
              description: 'Si es true, la nota no podrá verse en /notes/:id/public',
            },
            categoryId: {
              type: 'string',
              nullable: true,
              description: 'Identificador opcional de la categoría asociada',
              example: '6634c1e5d2a1b9f8e7c1a234',
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
            isPrivate: { type: 'boolean', example: true },
            categoryId: { type: 'string', nullable: true },
            image: {
              type: 'string',
              format: 'binary',
              description: 'Nueva imagen (opcional)',
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Identificador único de la categoría',
              example: '6635a2b3c4d5e6f7a8b9c0d1',
            },
            name: {
              type: 'string',
              description: 'Nombre de la categoría',
              example: 'Trabajo',
            },
            color: {
              type: 'string',
              description: 'Color asociado en formato hex',
              example: '#e74c3c',
            },
            userId: {
              type: 'string',
              description: 'Identificador del usuario propietario',
              example: 'user_123',
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        CategoryInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              description: 'Nombre de la categoría',
              example: 'Trabajo',
            },
            color: {
              type: 'string',
              description: 'Color en formato hex (opcional, default #3498db)',
              example: '#e74c3c',
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
