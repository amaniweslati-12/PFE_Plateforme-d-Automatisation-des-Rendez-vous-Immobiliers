const { Client } = require('pg');

async function checkPort(port, password) {
    const config = {
        user: 'postgres',
        host: 'localhost',
        database: 'postgres', // Connect to default first
        password: password,
        port: port
    };

    const client = new Client(config);
    try {
        await client.connect();
        const dbRes = await client.query("SELECT datname FROM pg_database WHERE datistemplate = false");
        const dbs = dbRes.rows.map(r => r.datname);
        console.log(`\n--- PORT ${port} ---`);
        console.log('Databases:', dbs);

        for (const dbName of dbs) {
            if (dbName === 'pfe_real_estate' || dbName === 'pfe_luxury_real_estate') {
                const dbClient = new Client({ ...config, database: dbName });
                try {
                    await dbClient.connect();
                    const tablesRes = await dbClient.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
                    console.log(`Tables in ${dbName}:`, tablesRes.rows.map(r => r.table_name));
                    await dbClient.end();
                } catch (e) {
                    console.log(`Could not access tables in ${dbName}:`, e.message);
                }
            }
        }
        await client.end();
    } catch (err) {
        console.log(`PORT ${port} connection failed:`, err.message);
    }
}

async function run() {
    await checkPort(5432, 'amani');
    await checkPort(5433, 'amani');
    await checkPort(5432, 'hadir');
    await checkPort(5433, 'hadir');
}

run();
