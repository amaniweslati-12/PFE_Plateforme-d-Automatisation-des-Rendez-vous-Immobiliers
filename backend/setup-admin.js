const bcrypt = require('bcryptjs');
const { pool } = require('./db/index');
require('dotenv').config();

async function createAdmin() {
    try {
        const hashedPassword = await bcrypt.hash('hadir', 10);
        const email = 'hadir.ayari@esen.tn';
        const nom = 'Admin Hadir';

        // Use a simple check then insert since ON CONFLICT might need specific constraint names in some versions
        const check = await pool.query('SELECT * FROM utilisateurs WHERE email = $1', [email]);

        if (check.rows.length > 0) {
            await pool.query(
                'UPDATE utilisateurs SET mot_de_passe = $1, role = $2 WHERE email = $3',
                [hashedPassword, 'admin', email]
            );
            console.log(`✅ Admin ${email} mis à jour.`);
        } else {
            await pool.query(
                'INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES ($1, $2, $3, $4)',
                [nom, email, hashedPassword, 'admin']
            );
            console.log(`✅ Admin ${email} créé.`);
        }
        process.exit(0);
    } catch (err) {
        console.error('❌ Erreur:', err.message);
        process.exit(1);
    }
}

createAdmin();
