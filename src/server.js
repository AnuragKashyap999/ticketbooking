import express from 'express';
import dotenv from 'dotenv';
import eventsRoute from './routes/events.route.js';
import usersRoute from './routes/users.route.js';
import bookingsRoute from './routes/bookings.route.js';
import attendanceRoute from './routes/attendance.route.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import cors from 'cors';


const swaggerFile = JSON.parse(
  fs.readFileSync('./src/swagger-output.json', 'utf-8')
);



import db from './db/index.js'; // ✅ default import



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.use('/api/v1/user', usersRoute);
app.use('/api/v1/event', eventsRoute);
app.use('/api/v1/booking', bookingsRoute);
app.use('/api/v1/attendance', attendanceRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

async function startServer() {
  try {
    // Test DB connection
    await db.query('SELECT 1');
    console.log('Connected to MySQL database!');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to DB:', err);
    process.exit(1); // Stop server if DB fails
  }
}


startServer();