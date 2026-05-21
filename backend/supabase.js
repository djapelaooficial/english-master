const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Polyfill WebSocket for Node < 22
if (!global.WebSocket) {
    global.WebSocket = require('ws');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
