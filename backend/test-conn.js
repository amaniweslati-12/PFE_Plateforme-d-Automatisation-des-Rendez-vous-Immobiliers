const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.test') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function testConnection() {
    try {
        console.log('Attempting to connect to:', process.env.DB_DATABASE);
        const res = await pool.query('SELECT current_database()');
        console.log('Connected successfully to:', res.rows[0].current_database);
        process.exit(0);
    } catch (err) {
        console.error('Connection error details:');
        console.error('Code:', err.code);
        console.error('Message:', err.message);
        console.error('Detail:', err.detail);
        process.exit(1);
    }
}

testConnection();
