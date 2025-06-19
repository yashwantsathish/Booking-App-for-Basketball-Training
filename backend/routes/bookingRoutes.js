const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all bookings with session details
router.get('/', async (req, res) => {
  const result = await pool.query(`
    SELECT bookings.id, sessions.* 
    FROM bookings JOIN sessions ON bookings.session_id = sessions.id
  `);
  res.json(result.rows);
});

// Book a session
router.post('/', async (req, res) => {
  const { session_id } = req.body;
  const result = await pool.query(
    'INSERT INTO bookings (session_id) VALUES ($1) RETURNING *',
    [session_id]
  );
  res.json(result.rows[0]);
});

// Cancel a booking
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await pool.query('DELETE FROM bookings WHERE id = $1', [id]);
  res.sendStatus(204);
});

module.exports = router;
