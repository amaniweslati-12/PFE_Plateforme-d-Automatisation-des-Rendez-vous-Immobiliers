const { pool } = require('./db/index');
require('dotenv').config();

async function inspectElements() {
    try {
        const results = await pool.query('SELECT photos FROM biens_immobiliers LIMIT 1');
        const photos = results.rows[0].photos;
        console.log(`Type of photos: ${typeof photos}`);
        console.log(`Is Array: ${Array.isArray(photos)}`);
        if (Array.isArray(photos)) {
            console.log(`Length: ${photos.length}`);
            photos.forEach((p, i) => {
                console.log(`Element ${i} type: ${typeof p}`);
                console.log(`Element ${i} value: "${p}"`);
            });
        }
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

inspectElements();
