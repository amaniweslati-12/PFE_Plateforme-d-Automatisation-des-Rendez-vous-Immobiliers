const { pool } = require('./db/index');

async function verifyDb() {
    try {
        console.log('--- Database Verification ---');
        console.log(`Connected to: ${process.env.DB_DATABASE}`);

        // 1. List Tables
        const tablesRes = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log('\nTables found:');
        tablesRes.rows.forEach(row => console.log(` - ${row.table_name}`));

        // 2. Count rows in main tables
        const agentsCount = await pool.query('SELECT COUNT(*) FROM agents_commerciaux');
        const propertiesCount = await pool.query('SELECT COUNT(*) FROM biens_immobiliers');

        console.log('\nData Summary:');
        console.log(` - Agents: ${agentsCount.rows[0].count}`);
        console.log(` - Properties: ${propertiesCount.rows[0].count}`);

        // 3. Show a sample property
        const sampleProp = await pool.query('SELECT titre, prix, adresse FROM biens_immobiliers LIMIT 1');
        if (sampleProp.rows.length > 0) {
            console.log('\nSample Property:');
            console.log(` - Title: ${sampleProp.rows[0].titre}`);
            console.log(` - Price: ${sampleProp.rows[0].prix}`);
            console.log(` - Address: ${sampleProp.rows[0].adresse}`);
        }

        console.log('\nVerification complete!');
        process.exit(0);
    } catch (err) {
        console.error('Error during verification:', err.message);
        process.exit(1);
    }
}

verifyDb();
