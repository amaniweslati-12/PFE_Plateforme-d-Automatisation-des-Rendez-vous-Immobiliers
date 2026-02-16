const bcrypt = require('bcryptjs');
const { pool } = require('./db/index');
require('dotenv').config();

async function addAdmins() {
    console.log('--- AJOUT DE NOUVEAUX ADMINISTRATEURS ---');

    const admins = [
        { nom: 'Admin Deux', email: 'admin2@luxury.com', password: 'adminpassword2' },
        { nom: 'Admin Trois', email: 'admin3@luxury.com', password: 'adminpassword3' }
    ];

    try {
        for (const admin of admins) {
            // Check if email already exists
            const check = await pool.query('SELECT * FROM utilisateurs WHERE email = $1', [admin.email]);
            if (check.rows.length > 0) {
                console.log(`⚠️ L'admin ${admin.email} existe déjà.`);
                continue;
            }

            const hashedPassword = await bcrypt.hash(admin.password, 10);
            await pool.query(
                'INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES ($1, $2, $3, $4)',
                [admin.nom, admin.email, hashedPassword, 'admin']
            );
            console.log(`✅ Admin ${admin.email} ajouté avec succès !`);
        }

        console.log('\n--- TERMINÉ ---');
        process.exit(0);
    } catch (err) {
        console.error('❌ Erreur:', err.message);
        process.exit(1);
    }
}

addAdmins();
