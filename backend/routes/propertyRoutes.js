const express = require('express');
const router = express.Router();
const { query } = require('../db/index');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');

// Get all properties
router.get('/', async (req, res) => {
    try {
        const result = await query('SELECT b.*, a.nom as agent_nom, a.prenom as agent_prenom FROM biens_immobiliers b LEFT JOIN utilisateurs a ON b.agent_id = a.id WHERE a.role = \'agent\' OR b.agent_id IS NULL ORDER BY b.date_creation DESC');
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
        const result = await query('SELECT b.*, a.nom as agent_nom, a.prenom as agent_prenom, a.telephone as agent_phone, a.photo_url as agent_photo FROM biens_immobiliers b LEFT JOIN utilisateurs a ON b.agent_id = a.id WHERE b.id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Propriété non trouvée' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Admin/Agent: Create property
router.post('/', auth, checkRole(['admin', 'agent']), async (req, res) => {
    try {
        const { titre, description, type, prix, surface, adresse, position_lat, position_lng, photos, amenities, chambres, salles_de_bain, annee_construction, agent_id } = req.body;

        // Use the logged-in agent's ID if not provided and user is agent
        const finalAgentId = (req.userData.role === 'agent') ? req.userData.userId : agent_id;

        const result = await query(
            'INSERT INTO biens_immobiliers (titre, description, type, prix, surface, adresse, position_lat, position_lng, photos, amenities, chambres, salles_de_bain, annee_construction, agent_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
            [titre, description, type, prix, surface, adresse, position_lat, position_lng, photos, amenities, chambres, salles_de_bain, annee_construction, finalAgentId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Admin/Agent: Update property
router.put('/:id', auth, checkRole(['admin', 'agent']), async (req, res) => {
    try {
        const { id } = req.params;
        const { titre, description, type, prix, surface, adresse, position_lat, position_lng, photos, amenities, chambres, salles_de_bain, annee_construction, agent_id, statut } = req.body;

        // Optional: Check if agent owns the property if role is agent
        if (req.userData.role === 'agent') {
            const check = await query('SELECT agent_id FROM biens_immobiliers WHERE id = $1', [id]);
            if (check.rows[0]?.agent_id !== req.userData.userId) {
                return res.status(403).json({ message: 'Forbidden: You can only update your own properties' });
            }
        }

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

// Admin: Delete property (only admin can delete)
router.delete('/:id', auth, checkRole(['admin']), async (req, res) => {
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
