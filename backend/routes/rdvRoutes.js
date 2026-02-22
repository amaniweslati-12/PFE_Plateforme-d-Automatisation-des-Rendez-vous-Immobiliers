const express = require('express');
const router = express.Router();
const { query } = require('../db/index');

/**
 * POST /api/rdv
 * Point d'entrée unique pour les demandes de rendez-vous depuis le Bot Telegram.
 * Pas d'authentification JWT requise.
 *
 * Body attendu:
 * {
 *   "name": "Jean Dupont",
 *   "email": "jean@example.com",
 *   "phone": "06XXXXXXXX",
 *   "date": "25/03/2026",
 *   "time": "14:30",
 *   "propertyId": "42",
 *   "telegram_id": "123456789"
 * }
 */
router.post('/', async (req, res) => {
    const { name, email, phone, date, time, propertyId, telegram_id } = req.body;

    // --- Validation de base ---
    if (!name || !email || !phone || !date || !time || !telegram_id) {
        return res.status(400).json({
            error: 'Champs manquants',
            required: ['name', 'email', 'phone', 'date', 'time', 'telegram_id']
        });
    }

    // --- Conversion date/heure ---
    let dateHeure;
    try {
        // Supporte "DD/MM/YYYY" et "HH:MM"
        const [day, month, year] = date.split('/');
        dateHeure = new Date(`${year}-${month}-${day}T${time}:00`);
        if (isNaN(dateHeure.getTime())) throw new Error('Date invalide');
    } catch (err) {
        return res.status(400).json({ error: 'Format de date invalide. Utilisez DD/MM/YYYY et HH:MM' });
    }

    try {
        // --- 1. Upsert du client dans utilisateurs (via telegram_id) ---
        const [nom, ...prenomParts] = name.trim().split(' ');
        const prenom = prenomParts.join(' ') || nom;

        const clientResult = await query(`
            INSERT INTO utilisateurs (nom, prenom, email, telephone, telegram_id, mot_de_passe, role)
            VALUES ($1, $2, $3, $4, $5, 'bot_client', 'client')
            ON CONFLICT (telegram_id) DO UPDATE
            SET nom = EXCLUDED.nom,
                prenom = EXCLUDED.prenom,
                email = EXCLUDED.email,
                telephone = EXCLUDED.telephone
            RETURNING id
        `, [nom, prenom, email, phone, telegram_id]);

        const clientId = clientResult.rows[0].id;

        // --- 2. Trouver l'agent associé au bien ---
        let agentId = null;
        if (propertyId) {
            const propResult = await query(
                'SELECT agent_id FROM biens_immobiliers WHERE id = $1',
                [parseInt(propertyId)]
            );
            agentId = propResult.rows[0]?.agent_id || null;
        }

        // --- 3. Créer le rendez-vous ---
        const notes = `RDV demandé via Telegram Bot | ID Telegram: ${telegram_id} | Tél: ${phone}`;

        const rdvResult = await query(`
            INSERT INTO rendez_vous (bien_id, client_id, agent_id, date_heure, statut, notes)
            VALUES ($1, $2, $3, $4, 'En attente', $5)
            RETURNING *
        `, [
            propertyId ? parseInt(propertyId) : null,
            clientId,
            agentId,
            dateHeure,
            notes
        ]);

        const rdv = rdvResult.rows[0];

        console.log(`✅ Nouveau RDV créé [id=${rdv.id}] pour client [id=${clientId}]`);

        return res.status(201).json({
            success: true,
            message: 'Rendez-vous enregistré avec succès',
            rdv: {
                id: rdv.id,
                date_heure: rdv.date_heure,
                statut: rdv.statut,
                bien_id: rdv.bien_id,
                client_id: rdv.client_id,
                agent_id: rdv.agent_id
            }
        });

    } catch (err) {
        console.error('❌ Erreur création RDV:', err.message);
        return res.status(500).json({ error: 'Erreur serveur lors de la création du rendez-vous' });
    }
});

/**
 * GET /api/rdv/status/:telegram_id
 * Permet au bot de consulter les RDV d'un client par son telegram_id.
 */
router.get('/status/:telegram_id', async (req, res) => {
    const { telegram_id } = req.params;

    try {
        const result = await query(`
            SELECT rv.id, rv.date_heure, rv.statut, rv.notes,
                   b.titre as bien_titre,
                   a.nom as agent_nom, a.prenom as agent_prenom
            FROM rendez_vous rv
            LEFT JOIN biens_immobiliers b ON rv.bien_id = b.id
            LEFT JOIN utilisateurs a ON rv.agent_id = a.id
            JOIN utilisateurs c ON rv.client_id = c.id
            WHERE c.telegram_id = $1
            ORDER BY rv.date_heure DESC
            LIMIT 5
        `, [telegram_id]);

        return res.json({ rdvs: result.rows });
    } catch (err) {
        console.error('❌ Erreur récupération RDVs:', err.message);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
