const express = require('express');
const router = express.Router();
const { query } = require('../db/index');
const auth = require('../middleware/auth');

// Get all agents
router.get('/', async (req, res) => {
    try {
        const result = await query('SELECT * FROM agents_commerciaux WHERE actif = true');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Admin: Create agent
router.post('/', auth, async (req, res) => {
    try {
        const { nom, prenom, email, telephone, photo_url } = req.body;
        const result = await query(
            'INSERT INTO agents_commerciaux (nom, prenom, email, telephone, photo_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nom, prenom, email, telephone, photo_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Admin: Update agent
router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, email, telephone, photo_url, actif } = req.body;
        const result = await query(
            'UPDATE agents_commerciaux SET nom=$1, prenom=$2, email=$3, telephone=$4, photo_url=$5, actif=$6 WHERE id=$7 RETURNING *',
            [nom, prenom, email, telephone, photo_url, actif, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
