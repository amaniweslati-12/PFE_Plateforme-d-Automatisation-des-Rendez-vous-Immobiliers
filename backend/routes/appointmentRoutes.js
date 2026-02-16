const express = require('express');
const router = express.Router();
const { query } = require('../db/index');
const auth = require('../middleware/auth');

// Admin: Get all appointments with extra info
router.get('/', auth, async (req, res) => {
    try {
        const result = await query(`
            SELECT rv.*, b.titre as property_title, c.nom as client_name, a.nom as agent_nom, a.prenom as agent_prenom 
            FROM rendez_vous rv
            JOIN biens_immobiliers b ON rv.bien_id = b.id
            JOIN clients c ON rv.client_id = c.id
            JOIN agents_commerciaux a ON rv.agent_id = a.id
            ORDER BY rv.date_heure DESC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Client/Bot: Create appointment
router.post('/', async (req, res) => {
    try {
        const { bien_id, client_id, agent_id, date_heure, notes } = req.body;
        const result = await query(
            'INSERT INTO rendez_vous (bien_id, client_id, agent_id, date_heure, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [bien_id, client_id, agent_id, date_heure, notes]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Admin: Update appointment status
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;
        const result = await query(
            'UPDATE rendez_vous SET statut=$1 WHERE id=$2 RETURNING *',
            [statut, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
