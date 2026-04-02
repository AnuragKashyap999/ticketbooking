import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Mini Event Management API',
    description: 'API for events, bookings and attendance'
  },
  host: 'https://ticketbookingsystem-kf4g.onrender.com'
};

const outputFile = './src/swagger.json';

// ✅ Only main file
const routes = ['./src/server.js'];

swaggerAutogen()(outputFile, routes, doc);