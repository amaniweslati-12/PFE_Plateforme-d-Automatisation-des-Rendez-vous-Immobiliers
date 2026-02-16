const express = require('express');
const router = express.Router();
const { query } = require('../db/index');
const auth = require('../middleware/auth');

// Get all properties
router.get('/', async (req, res) => {
    try {
        const result = await query('SELECT b.*, a.nom as agent_nom, a.prenom as agent_prenom FROM biens_immobiliers b LEFT JOIN agents_commerciaux a ON b.agent_id = a.id ORDER BY b.date_creation DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Get property by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query('SELECT b.*, a.nom as agent_nom, a.prenom as agent_prenom, a.telephone as agent_phone, a.photo_url as agent_photo FROM biens_immobiliers b LEFT JOIN agents_commerciaux a ON b.agent_id = a.id WHERE b.id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Propriété non trouvée' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Admin: Create property
router.post('/', auth, async (req, res) => {
    try {
        const { titre, description, type, prix, surface, adresse, position_lat, position_lng, photos, amenities, chambres, salles_de_bain, annee_construction, agent_id } = req.body;
        const result = await query(
            'INSERT INTO biens_immobiliers (titre, description, type, prix, surface, adresse, position_lat, position_lng, photos, amenities, chambres, salles_de_bain, annee_construction, agent_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
            [titre, description, type, prix, surface, adresse, position_lat, position_lng, photos, amenities, chambres, salles_de_bain, annee_construction, agent_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Admin: Update property
router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { titre, description, type, prix, surface, adresse, position_lat, position_lng, photos, amenities, chambres, salles_de_bain, annee_construction, agent_id, statut } = req.body;
        const result = await query(
            'UPDATE biens_immobiliers SET titre=$1, description=$2, type=$3, prix=$4, surface=$5, adresse=$6, position_lat=$7, position_lng=$8, photos=$9, amenities=$10, chambres=$11, salles_de_bain=$12, annee_construction=$13, agent_id=$14, statut=$15 WHERE id=$16 RETURNING *',
            [titre, description, type, prix, surface, adresse, position_lat, position_lng, photos, amenities, chambres, salles_de_bain, annee_construction, agent_id, statut, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Admin: Delete property
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        await query('DELETE FROM biens_immobiliers WHERE id = $1', [id]);
        res.json({ message: 'Propriété supprimée' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
