const express = require('express');
const app = express();

app.use(express.json());

app.use('/auth', require('./modules/auth/auth.routes.js'));

// Health check route to verify server + db connection
app.get('/health', async (req, res) => {
  const db = require('./config/db');
  const { error } = await db.from('users').select('id').limit(1);
  if (error) return res.status(500).json({ status: 'DB connection failed', error: error.message });
  res.json({ status: 'ok' });
});

// Global error handler

app.use(require('./middleware/errorHandler.js'));

module.exports = app;