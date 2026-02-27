const express = require('express');
const app = express();

// global middleware runs on every request
// without this: the req.body will be undefined, express does not do it automatically
app.use(express.json());

app.use('/auth', require('./modules/auth/auth.routes.js'));
app.use('/friends', require('./modules/friends/friends.routes.js'));

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