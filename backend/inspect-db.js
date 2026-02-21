const { Client } = require('pg');

async function inspect() {
    const config = {
        user: 'postgres',
        host: 'localhost',
        database: 'pfe_real_estate',
        password: 'amani',
        port: 5433
    };

    const client = new Client(config);

    try {
        await client.connect();

        const tablesRes = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log('\n--- FINAL TABLE LIST ---');
        console.log(tablesRes.rows.map(r => r.table_name).sort());

        const roleRes = await client.query(`
            SELECT role, count(*) 
            FROM utilisateurs 
            GROUP BY role
        `);
        console.log('\n--- ROLE COUNTS ---');
        console.table(roleRes.rows);

        await client.end();
    } catch (err) {
        console.error('ERROR:', err.message);
    }
}

inspect();
