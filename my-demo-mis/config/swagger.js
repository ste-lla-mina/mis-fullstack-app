const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MIS API Documentation',
      version: '1.0.0',
      description: 'Complete School Management System API',
    },
    servers: [
      {
        url: 'http://localhost:4700',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Student: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            course: { type: 'string' },
            grade: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsDoc(options);
module.exports = specs;