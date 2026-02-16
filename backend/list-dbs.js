const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.test') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres', // Connect to default DB to list others
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function listDatabases() {
    try {
        console.log('Listing databases...');
        const res = await pool.query('SELECT datname FROM pg_database WHERE datistemplate = false');
        console.log('Available databases:');
        res.rows.forEach(row => console.log(' - ' + row.datname));
        process.exit(0);
    } catch (err) {
        console.error('Connection error:', err.message);
        process.exit(1);
    }
}

listDatabases();
