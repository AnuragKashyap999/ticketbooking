import express from 'express';
import db from '../db/index.js'; 
const router = express.Router();

// Helper function to get DB connection from app.locals

router.get('/events', async (req, res) => {
  

  const [rows] = await db.execute(
    'SELECT * FROM events WHERE event_date >= NOW()'
  );

  res.json(rows);
});
router.post('/events', async (req, res) => {
  
  const { title, description, event_date, total_capacity } = req.body;

  const remaining_tickets = total_capacity; // default

  console.log({ title, description, event_date, total_capacity, remaining_tickets });

  try {
    const [result] = await db.execute(
      `INSERT INTO events (title, description, event_date, total_capacity, remaining_tickets)
       VALUES (?, ?, ?, ?, ?)`,
      [title, description, event_date, total_capacity, remaining_tickets]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description,
      event_date,
      total_capacity,
      remaining_tickets
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
export default router;