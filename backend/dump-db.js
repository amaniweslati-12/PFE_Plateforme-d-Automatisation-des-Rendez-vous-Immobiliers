const { pool } = require('./db/index');
require('dotenv').config();

async function dumpDB() {
    try {
        console.log('--- Database Content Dump ---');
        const results = await pool.query('SELECT id, titre, description, photos, amenities FROM biens_immobiliers ORDER BY id DESC LIMIT 5');

        results.rows.forEach(row => {
            console.log(`\nID: ${row.id}`);
            console.log(`Titre: ${row.titre}`);
            console.log(`Desc: ${row.description ? row.description.substring(0, 50) + '...' : 'NULL'}`);
            console.log(`Photos Type: ${typeof row.photos}`);
            console.log(`Photos Value: ${JSON.stringify(row.photos)}`);
            console.log(`Amenities Value: ${JSON.stringify(row.amenities)}`);
        });

        process.exit(0);
    } catch (err) {
        console.error('Dump failed:', err.message);
        process.exit(1);
    }
}

dumpDB();
