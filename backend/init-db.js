const fs = require('fs');
const path = require('path');
const { pool } = require('./db/index');

async function initDb() {
    try {
        console.log(`Initializing database: ${process.env.DB_DATABASE}...`);

        const schemaPath = path.join(__dirname, 'db', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Execute the entire schema
        await pool.query(schema);

        console.log('Database schema initialized successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    }
}

initDb();
