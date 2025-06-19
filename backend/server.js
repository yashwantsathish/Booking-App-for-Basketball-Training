require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://your-frontend.vercel.app' // ← Replace with actual frontend URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

const pool = require('./db');

app.use(express.json());

app.use('/sessions', require('./routes/sessionRoutes'));
app.use('/bookings', require('./routes/bookingRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      session_id INTEGER REFERENCES sessions(id),
      user_id INTEGER REFERENCES users(id)
    );
  `);
}
initDB();

app.get('/seed', async (req, res) => {
  await pool.query(`
    INSERT INTO sessions (title, date, time)
    VALUES
      ('Speed Training', '2025-06-20', '10:00 AM'),
      ('Shooting Drills', '2025-06-21', '2:00 PM'),
      ('Strength Workout', '2025-06-22', '4:00 PM')
    ON CONFLICT DO NOTHING;
  `);
  res.send('Seeded sessions');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
