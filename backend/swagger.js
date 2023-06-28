const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Management API',
      version: '1.0.0',
      description: 'Product Management API with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
        schemas: {
          Product: {
            type: 'object',
            properties: {
              // Define properties of the Product schema
              productId: { type: 'integer' },
              productName: { type: 'string' },
                scrumMaster: { type: 'string' },
                productOwnerName: { type: 'string' },
                developers: { type: 'array' },
                startDate: { type: 'string' },
                methodology: { type: 'string' },
                location: { type: 'string' },
            },
          },
        },
      },
  },
  apis: ['./*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;