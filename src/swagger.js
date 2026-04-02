import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Mini Event Management API',
    description: 'API for events, bookings and attendance'
  },
  host: 'localhost:4000'
};

const outputFile = './src/swagger.json';

// ✅ Only main file
const routes = ['./src/server.js'];

swaggerAutogen()(outputFile, routes, doc);