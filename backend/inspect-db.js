const { pool } = require('./db/index');
require('dotenv').config();

async function inspect() {
    try {
        console.log('--- Full Database Inspection ---');

        // 1. Check tables
        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);

        for (const table of tables.rows) {
            const tableName = table.table_name;
            const count = await pool.query(`SELECT COUNT(*) FROM ${tableName}`);
            const columns = await pool.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = '${tableName}'
            `);

            console.log(`\nTable: ${tableName} (${count.rows[0].count} rows)`);
            columns.rows.forEach(col => {
                console.log(` - ${col.column_name}: ${col.data_type}`);
            });
        }

        process.exit(0);
    } catch (err) {
        console.error('Inspection failed:', err.message);
        process.exit(1);
    }
}

inspect();
