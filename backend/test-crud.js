const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { pool } = require('./db/index');
require('dotenv').config();

const API_BASE = `http://localhost:${process.env.PORT || 5000}/api`;

async function testCRUD() {
    console.log('--- TEST CRUD BACKEND ---');
    let token = '';
    let testPropertyId = null;

    try {
        // 1. LOGIN
        console.log('\n1. Test de Connexion...');
        const loginRes = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@luxury.com', password: 'admin123' })
        });
        const loginData = await loginRes.json();
        if (!loginData.token) throw new Error('Échec du login');
        token = loginData.token;
        console.log('✅ Login réussi. Token généré.');

        // 2. CREATE
        console.log('\n2. Création d\'un bien de test...');
        const createRes = await fetch(`${API_BASE}/properties`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                titre: 'BIEN DE TEST CRUD',
                type: 'Villa',
                prix: 9999999,
                surface: 500,
                adresse: 'Test Road, Dubai',
                chambres: 5,
                salles_de_bain: 4
            })
        });
        const newProp = await createRes.json();
        testPropertyId = newProp.id;
        console.log(`✅ Bien créé avec l'ID: ${testPropertyId}`);

        // 3. VERIFY IN DB
        const dbCheck = await pool.query('SELECT * FROM biens_immobiliers WHERE id = $1', [testPropertyId]);
        if (dbCheck.rows.length > 0 && dbCheck.rows[0].titre === 'BIEN DE TEST CRUD') {
            console.log('✅ Vérification BDD : Le bien existe bien dans la base de données.');
        } else {
            throw new Error('Le bien n\'est pas présent en BDD après création.');
        }

        // 4. UPDATE
        console.log('\n4. Modification du bien...');
        await fetch(`${API_BASE}/properties/${testPropertyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                titre: 'BIEN DE TEST MODIFIÉ',
                type: 'Villa',
                prix: 8888888,
                statut: 'Vendu'
            })
        });
        const dbUpdateCheck = await pool.query('SELECT titre, statut FROM biens_immobiliers WHERE id = $1', [testPropertyId]);
        console.log(`✅ Modification vérifiée en BDD : Nouveau titre = ${dbUpdateCheck.rows[0].titre}, Statut = ${dbUpdateCheck.rows[0].statut}`);

        // 5. DELETE
        console.log('\n5. Suppression du bien...');
        await fetch(`${API_BASE}/properties/${testPropertyId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const dbDeleteCheck = await pool.query('SELECT * FROM biens_immobiliers WHERE id = $1', [testPropertyId]);
        if (dbDeleteCheck.rows.length === 0) {
            console.log('✅ Suppression vérifiée en BDD : Le bien a bien été supprimé.');
        } else {
            throw new Error('La suppression a échoué en BDD.');
        }

        console.log('\n🎉 TOUS LES TESTS CRUD ONT RÉUSSI !');
        process.exit(0);

    } catch (err) {
        console.error('\n❌ ERREUR DURANT LE TEST:', err.message);
        process.exit(1);
    }
}

testCRUD();
