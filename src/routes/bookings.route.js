import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import db from '../db/index.js'; // default import from pool

const router = express.Router();

// POST /booking — create a booking
router.post('/', async (req, res) => {
  const { users_id, event_id } = req.body;

  if (!users_id || !event_id) {
    return res.status(400).json({ error: 'Missing user_id or event_id' });
  }

  const connection = await db.getConnection(); // get a transaction connection

  try {
    await connection.beginTransaction();

    // 1. Check availability with row lock
    const [events] = await connection.execute(
      'SELECT remaining_tickets FROM events WHERE id = ? FOR UPDATE',
      
    );

    if (events.length === 0) throw new Error('Event not found');
    if (events[0].remaining_tickets <= 0) throw new Error('No tickets available');

    // 2. Insert booking

   await connection.execute(
  'INSERT INTO bookings (users_id, event_id, booking_date) VALUES (?, ?, CURRENT_DATE)',
  [users_id, event_id]
);

    // 3. Update remaining tickets
    await connection.execute(
      'UPDATE events SET remaining_tickets = remaining_tickets - 1 WHERE id = ?',
      [event_id]
    );

    await connection.commit();

    res.status(201).json({
      message: 'Booking successful',
      
    });
  } catch (err) {
    await connection.rollback();
    res.status(400).json({ error: err.message });
  } finally {
    connection.release(); // release connection back to pool
  }
});

// GET bookings for a user
router.get('/users/:id/bookings', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT 
          u.name,
          e.title,
          e.event_date
       FROM bookings b
       JOIN users u ON b.users_id = u.id
       JOIN events e ON b.event_id = e.id
       WHERE b.users_id = ?`,
      [id]
    );
     if (rows.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});
// GET /bookings — get all bookings
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT 
       *
       FROM bookings `
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

export default router;