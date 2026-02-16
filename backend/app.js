const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { query } = require('./db/index');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
// 1. Get all properties
app.get('/api/properties', async (req, res) => {
    try {
        const result = await query('SELECT b.*, a.nom as agent_nom, a.prenom as agent_prenom FROM biens_immobiliers b LEFT JOIN agents_commerciaux a ON b.agent_id = a.id ORDER BY b.date_creation DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// 2. Get property by ID
app.get('/api/properties/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query('SELECT b.*, a.nom as agent_nom, a.prenom as agent_prenom, a.telephone as agent_phone, a.photo_url as agent_photo FROM biens_immobiliers b LEFT JOIN agents_commerciaux a ON b.agent_id = a.id WHERE b.id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Property not found' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// 3. Get all agents
app.get('/api/agents', async (req, res) => {
    try {
        const result = await query('SELECT * FROM agents_commerciaux WHERE actif = true');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// 4. Create appointment
app.post('/api/appointments', async (req, res) => {
    try {
        const { bien_id, client_id, agent_id, date_heure, notes } = req.body;
        const result = await query(
            'INSERT INTO rendez_vous (bien_id, client_id, agent_id, date_heure, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [bien_id, client_id, agent_id, date_heure, notes]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = app;
