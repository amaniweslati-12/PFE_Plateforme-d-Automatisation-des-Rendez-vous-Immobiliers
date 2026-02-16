const { Client } = require('pg');
require('dotenv').config();

async function createDatabase() {
    // Connect to 'postgres' database to create a new one
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: 'postgres'
    });

    try {
        await client.connect();
        console.log('Connected to PostgreSQL (postgres database).');

        const dbName = 'pfe_real_estate';

        // Check if database exists
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [dbName]);

        if (res.rowCount === 0) {
            console.log(`Creating database ${dbName}...`);
            await client.query(`CREATE DATABASE ${dbName}`);
            console.log(`Database ${dbName} created successfully.`);
        } else {
            console.log(`Database ${dbName} already exists.`);
        }

        await client.end();
        process.exit(0);
    } catch (err) {
        console.error('Error creating database:', err.message);
        await client.end();
        process.exit(1);
    }
}

createDatabase();
