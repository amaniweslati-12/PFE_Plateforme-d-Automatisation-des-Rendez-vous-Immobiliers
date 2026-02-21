const express = require('express');
const router = express.Router();
const { query } = require('../db/index');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');

// Get all agents (public access)
router.get('/', async (req, res) => {
    try {
        const result = await query('SELECT id, nom, prenom, email, telephone, photo_url, calendar_id FROM utilisateurs WHERE role = \'agent\' AND actif = true');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching agents:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Admin: Create agent (unified table)
router.post('/', auth, checkRole(['admin']), async (req, res) => {
    try {
        const { nom, prenom, email, telephone, photo_url, mot_de_passe } = req.body;

        // Check if exists
        const check = await query('SELECT * FROM utilisateurs WHERE email = $1', [email]);
        if (check.rows.length > 0) return res.status(400).json({ message: 'Email déjà utilisé' });

        const result = await query(
            'INSERT INTO utilisateurs (nom, prenom, email, telephone, photo_url, mot_de_passe, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nom, prenom, email, telephone, photo_url, mot_de_passe, 'agent']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating agent:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Admin: Update agent
router.put('/:id', auth, checkRole(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, email, telephone, photo_url, actif } = req.body;
        const result = await query(
            'UPDATE utilisateurs SET nom=$1, prenom=$2, email=$3, telephone=$4, photo_url=$5, actif=$6 WHERE id=$7 AND role=\'agent\' RETURNING *',
            [nom, prenom, email, telephone, photo_url, actif, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Agent non trouvé' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating agent:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
