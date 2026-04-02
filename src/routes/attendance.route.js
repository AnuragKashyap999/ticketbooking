
import express from 'express';
import db from '../db/index.js';

const router = express.Router();

// POST /attendance — create attendance record
router.post('/', async (req, res) => {
  const { users_id, event_id } = req.body;

  if (!users_id || !event_id) {
    return res.status(400).json({ error: 'Missing user_id or event_id' });
  }

  try {
    // 1. Check if user has a booking for this event
    const [bookings] = await db.execute(
      'SELECT id FROM bookings WHERE users_id = ? AND event_id = ?',
      [users_id, event_id]
    );

    if (bookings.length === 0) {
      return res.status(400).json({ error: 'User has no booking for this event' });
    }

    // 2. Record attendance
    await db.execute(
      'INSERT INTO event_attendance (user_id, entry_time) VALUES (?, NOW())',
      [users_id, ]
    );

    res.status(201).json({ message: 'Attendance recorded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record attendance' });
  }
});

// GET /attendance — get all attendance records
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT 
          u.id,
          u.name,
          u.email,
          ea.entry_time
       FROM event_attendance ea
       JOIN users u ON ea.user_id = u.id
       ORDER BY ea.entry_time DESC`
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
});

export default router;

