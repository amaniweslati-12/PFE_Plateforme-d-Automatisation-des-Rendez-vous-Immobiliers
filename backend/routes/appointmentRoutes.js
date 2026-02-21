const express = require('express');
const router = express.Router();
const { query } = require('../db/index');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');

// Get appointments (RBAC enabled)
router.get('/', auth, checkRole(['admin', 'agent']), async (req, res) => {
    try {
        let sql = `
            SELECT rv.*, b.titre as property_title, 
                   c.nom as client_name, c.prenom as client_prenom,
                   a.nom as agent_nom, a.prenom as agent_prenom 
            FROM rendez_vous rv
            JOIN biens_immobiliers b ON rv.bien_id = b.id
            JOIN utilisateurs c ON rv.client_id = c.id
            JOIN utilisateurs a ON rv.agent_id = a.id
        `;

        let params = [];
        if (req.userData.role === 'agent') {
            sql += ' WHERE rv.agent_id = $1';
            params.push(req.userData.userId);
        }

        sql += ' ORDER BY rv.date_heure DESC';

        const result = await query(sql, params);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching appointments:', err);
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
        console.error('Error creating appointment:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Admin/Agent: Update appointment status
router.put('/:id/status', auth, checkRole(['admin', 'agent']), async (req, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;

        // If agent, verify ownership
        if (req.userData.role === 'agent') {
            const check = await query('SELECT agent_id FROM rendez_vous WHERE id = $1', [id]);
            if (check.rows[0]?.agent_id !== req.userData.userId) {
                return res.status(403).json({ message: 'Forbidden: Access denied' });
            }
        }

        const result = await query(
            'UPDATE rendez_vous SET statut=$1 WHERE id=$2 RETURNING *',
            [statut, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Rendez-vous non trouvé' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating appointment:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
