/**
 * Connect to the database
 */

const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = require('./env');

const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

module.exports = db;