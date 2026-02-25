/**
 * Validates that the env variables exist
 */

require('dotenv').config();

const required = [
  'PORT',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_KEY'
];

required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

module.exports = {
  PORT: process.env.PORT || 3000,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
};